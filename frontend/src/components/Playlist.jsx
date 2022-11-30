import { React, useState } from 'react'
import { useCookies } from 'react-cookie'
import  { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

import TrackList from '../components/TrackList'
import ReactStars from 'react-rating-stars-component'
import CustomAlert from "../components/CustomAlert";

import {
    Tag,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    Button,
    Grid,
    GridItem,
    Divider,
    Box,
    Center,
    Flex,
    Icon,
    Avatar,
    IconButton,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormLabel,
    Textarea,
    useToast,
} from '@chakra-ui/react'

import {
    EditIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
    ChatIcon,
} from '@chakra-ui/icons'

let url = require("../setup/api.setup.js")

function Playlist (props) {
    const auth = getAuth();
    const [user, setUser] = useState(null)
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isPublic, setIsPublic] = useState(props.vals.isPublic)
    const [reviewDescription, setReviewDescription] = useState("")

    const [isModalOpen, setModalOpen] = useState(false)
    const [rating, setRating] = useState(0)

    const toast = useToast()

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const navigate = useNavigate()

    const getDate = (val) => {
        return val.split("T")[0]
    }

    const changeContentState = () => {
        setIsOpen(!isOpen)
    }

    const convertToTime = (time) => {
        return Math.floor(time / 60) + ":" + (time % 60).toString().padStart(2, '0')
    }

    const changePrivacy = () => {

        console.log(props.vals)

        props.vals.isPublic = !props.vals.isPublic

        fetch(`${url}api/list/${props.vals.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.vals)
        })
            .then(res => res.json()
                .then(res => {
                    if (res.message) {
                        alert(res.message)
                    } else {
                        setIsPublic(props.vals.isPublic)
                    }
                })
            )
    }
    
    const addReview = () => {
        closing()

        let body = JSON.stringify({
            "listId": props.vals.id,
            "userEmail": user.email,
            "description": reviewDescription,
            "rating": rating
        })

        console.log(body)

        fetch(`${url}api/review`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => console.log(res))
            .then(res => {
                if(res && res.message) {
                    toast({
                        title: 'Error Publishing Review',
                        description: res.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Review Published.',
                        description: `We've published your review on ${props.vals.name}.`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
    }

    const editPlaylist = () => {
        console.log("Redirecting...")
        navigate('/search/', { state: props.vals })
    }

    const addComment = () => setModalOpen(true)

    const closing = () => setModalOpen(false)

    return(
        <>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closing}
                motionPreset='slideInBottom'
                w="500px"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Commenting on playlist <b>{props.vals.name}</b></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <FormLabel>Rating</FormLabel>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={40}
                                activeColor="#ffd700"
                            />
                            <br /><br />
                            <FormLabel> Description: </FormLabel>
                                <Textarea
                                    placeholder = "Enter in your review..."
                                    value = {reviewDescription}
                                    onChange = {(e) => setReviewDescription(e.target.value)}
                                />
                            <br /><br />
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={addReview}>
                            Comment
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box w="50%">
                <Center>
                    <Card w="90%">
                        <CardHeader>
                            <Grid
                                h='25px'
                                templateColumns='repeat(5, 1fr)'
                                gap={4}
                            >
                                <GridItem colSpan={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Box>
                                                <Heading size='sm'>{props.vals.name} - {convertToTime(props.vals.totalPlayTime)}</Heading>
                                                <Text fontSize="xs" as="i">
                                                    Last Updated on {props.vals.updated == "0000-00-00 00:00:00" ? getDate(props.vals.created) : getDate(props.vals.updated)}
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Flex flex='-1' gap='2' alignItems='center' flexWrap='wrap'>
                                            <Tooltip label="Expand Content">
                                                <IconButton
                                                    variant='ghost'
                                                    colorScheme='gray'
                                                    aria-label='See menu'
                                                    icon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                                                    onClick={changeContentState}
                                                />
                                            </Tooltip>
                                            
                                            {
                                                user &&
                                                user.email == props.vals.createdBy ?
                                                <>
                                                    <Tooltip label={"Make " + (props.vals.isPublic ? 'Private' : 'Public')}>
                                                        <IconButton
                                                            variant='ghost'
                                                            colorScheme='gray'
                                                            aria-label='See menu'
                                                            icon={props.vals.isPublic ? <ViewIcon /> : <ViewOffIcon />}
                                                            onClick={changePrivacy}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip label="Edit Playlist">
                                                        <IconButton
                                                            variant='ghost'
                                                            colorScheme='gray'
                                                            aria-label='See menu'
                                                            icon={<EditIcon />}
                                                            onClick={editPlaylist}
                                                        />
                                                    </Tooltip>
                                                </>                                                
                                                :
                                                <></>
                                            }   
                                            <Tooltip label="Add Comment">
                                                <IconButton
                                                    variant='ghost'
                                                    colorScheme='gray'
                                                    aria-label='See menu'
                                                    icon={<ChatIcon />}
                                                    onClick={addComment}
                                                />
                                            </Tooltip>                                     
                                        </Flex>
                                    </Flex>                                
                                </GridItem>
                            </Grid>
                        </CardHeader>
                        <Divider />
                        {
                            isOpen ?
                                <CardBody>
                                    {/* <Text>Your list has {props.vals.numberOfTracks} track{props.vals.numberOfTracks > 1 ? 's' : ''}</Text> */}
                                    <TrackList tracks={props.vals.tracks.split(",")}></TrackList>
                                </CardBody> 
                            : 
                                <></>
                        }
                    </Card>
                </Center>
            </Box> 
        </>
        
    )
}

export default Playlist
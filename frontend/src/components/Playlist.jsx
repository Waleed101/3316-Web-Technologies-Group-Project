import { React, useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'
import  { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

import TrackList from './TrackList'
import ReviewList from '../components/ReviewList'
import ReactStars from 'react-rating-stars-component'

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
    List,
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
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import {
    AddIcon,
    DeleteIcon,
    EditIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
    ChatIcon,
    StarIcon,
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
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [isModalOpen, setModalOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [stars, setStars] = useState([<StarIcon />])

    const [avgRating, setAvgRating] = useState(0)

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

        fetch(`${url}api/secure/list/${props.vals.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies["user"].token
            },
            body: JSON.stringify(props.vals)
        })
            .then(res => res.json()
                .then(res => {
                    if (res.message) {
                        toast({
                            title: 'Error Changing Privacy',
                            description: res.message,
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: 'Successfuly Updated Privacy.',
                            description: `Made Playlist ${props.vals.isPublic ? 'public' : 'private'}`,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
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

        fetch(`${url}api/secure/review`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies["user"].token
            },
            body: body
        }).then(res => console.log(res))
            .then(res => {
                if(res && res.message) {
                    toast({
                        title: 'Error Publishing Review',
                        description: res.message,
                        status: 'error',
                        duration: 10000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Review Published.',
                        description: `We've published your review on ${props.vals.list_name}.`,
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
    
    const deletePlaylist = () =>{
        deletePlaylistCancel()

        let body = JSON.stringify({
            'user': user.email,
            'name': props.vals.list_name
        })
        
        fetch(`${url}api/secure/list/`,{
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies["user"].token
            },
            body: body}).then(res => res.json())
            .then(res => {
                    if(!res.message) {
                        toast({
                            title: 'Error Deleting Playlist.',
                            description: `The following error was encountered ${res.message}`,
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: 'Deleted Playlist.',
                            description: `Successfully deleted the playlist.`,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                    props.refreshPlaylist()
                })
    }

    const deletePlaylistStart = () => setIsDeleteOpen(true)

    const deletePlaylistCancel = () => setIsDeleteOpen(false)
                
    const addComment = () => setModalOpen(true)

    const closing = () => setModalOpen(false)

    useEffect(() => {
        fetch(`${url}api/review/?type=1&referenceId=${props.vals.id}&avg=y`)
            .then(res => res.json())
                .then(res => {
                    if(res.length == 0) {
                        setStars([<Text>No Ratings</Text>])
                    } else {
                        let temp = []

                        for(let i = 0; i < Math.ceil(res[0]['avg']); i += 1) {
                            temp.push(<StarIcon />)
                        }
    
                        setStars(temp)
                        setAvgRating(res[0]['avg'])
                    }

                })
    }, [])
        
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
                    <ModalHeader>Commenting on playlist <b>{props.vals.list_name}</b></ModalHeader>
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
            <Modal 
                isOpen={isDeleteOpen} 
                onClose={deletePlaylistCancel}
                motionPreset='slideInBottom'
                w="500px"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to delete <b>{props.vals.list_name}</b>?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        This action is <b>not</b> reversible.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={deletePlaylistCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' mr={3} onClick={deletePlaylist}>
                            Delete
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
                                                <Heading size='sm'>{props.vals.list_name} - {convertToTime(props.vals.totalPlayTime)}</Heading>
                                                <Text fontSize="xs" as="i">By: { user && user.email == props.vals.createdBy ? "You" : props.vals.name}</Text>
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
                                                    <Tooltip label="Delete Playlist">
                                                        <IconButton
                                                            variant='ghost'
                                                            colorScheme='gray'
                                                            aria-label='See menu'
                                                            icon={<DeleteIcon />}
                                                            onClick={deletePlaylistStart}
                                                        />
                                                    </Tooltip>
                                                </>                                                
                                                :
                                                <></>
                                            }   
                                            {user ? <Tooltip label="Add Comment">
                                                <IconButton
                                                    variant='ghost'
                                                    colorScheme='gray'
                                                    aria-label='See menu'
                                                    icon={<ChatIcon />}
                                                    onClick={addComment}
                                                />
                                            </Tooltip> : <></> }                                 
                                        </Flex>
                                    </Flex>                                
                                </GridItem>
                            </Grid>
                        </CardHeader>
                        <Divider />
                        {
                            isOpen ?
                                <>
                                    <CardBody>
                                        <Heading size="h4">Information</Heading>
                                        <Divider />
                                        <br />
                                        <Text><b>Description: </b> {props.vals.description}</Text>
                                        <Text><b>Average Rating: </b> {avgRating} - {stars.map((s) => <>{s}</>)}</Text>
                                        <Text fontSize="xs" as="i">
                                                    Last Updated on {props.vals.updated == "0000-00-00 00:00:00" ? getDate(props.vals.created) : getDate(props.vals.updated)}
                                                </Text>
                                        <br />
                                        <Heading size="h4">Reviews</Heading>
                                        <Divider />
                                        <ReviewList user={user ? user.email : null} reference={props.vals.id} type={1} summary={true}></ReviewList>
                                        <br />
                                        <Heading size="h4">Tracks</Heading>
                                        <Divider />
                                        <TrackList tracks={props.vals.tracks.split(",")}></TrackList>
                                        <br />

                                    </CardBody> 
                                </>
                                
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
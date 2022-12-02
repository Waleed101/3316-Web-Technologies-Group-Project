import { React, useEffect, useState } from 'react'

import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

import ReactStars from 'react-rating-stars-component'
import ReviewList from '../components/ReviewList'

import './css/TrackView.css'

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
    IconButton,
    useToast,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Modal,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    ModalFooter,
    Textarea,
    Tooltip,
} from '@chakra-ui/react'

import {
    AddIcon,
    ExternalLinkIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ChatIcon,
    StarIcon,
} from '@chakra-ui/icons'

let url = require("../setup/api.setup.js")

function TrackView (props) {

    const auth = getAuth();
    const [user, setUser] = useState(null) 
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })
    const [isOpen, setIsOpen] = useState(false)

    const ADD_TO = <AddIcon />
    const REMOVE_FROM = <MinusIcon />

    const [added, setAdded] = useState(props.isSelected)
    const [btnMsg, setBtnMsg] = useState(props.isSelected ? REMOVE_FROM : ADD_TO)

    const [rating, setRating] = useState(0)

    const [stars, setStars] = useState([<StarIcon />])
    const [avgRating, setAvgRating] = useState(0)

    const [reviewDescription, setReviewDescription] = useState("")
    const [isModalOpen, setModalOpen] = useState(false)

    const toast = useToast()

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const COLORS = ["teal", "blue", "green", "cyan", "red"]

    let genre = []

    props.arr.genres.forEach(g => {
        genre.push(<Tag 
                        size='md' 
                        variant='solid' 
                        colorScheme={COLORS[g.id % (COLORS.length)]}
                    >
                        <Text fontSize={props.size}>
                            {g.title}
                        </Text>
                    </Tag>)
    })
//access the track data
    const id = "addTo" + props.arr.id

    const select = () => {
        if (!added) {
            props.selectTrack(props.arr.id, props.arr.title)
        } else {
            props.removeTrack(props.arr.id)
        }

        setBtnMsg(added ? ADD_TO : REMOVE_FROM)
        setAdded(!added)
    }

    const searchYoutube = () => {
        let link = 'https://www.youtube.com/results?search_query=' + props.arr.artistName + props.arr.title
        console.log(link)
        window.open(link,'_blank','noopener,noreferrer')
    }

    const changeContentState = () => {
        setIsOpen(!isOpen)
    }

    const addReview = () => {
        closing()

        let body = JSON.stringify({
            "trackId": props.arr.id,
            "userEmail": user.email,
            "description": reviewDescription,
            "rating": rating
        })

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
                        description: `We've published your review on ${props.arr.title}.`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
    }
                
    const addComment = () => setModalOpen(true)

    const closing = () => setModalOpen(false)

    useEffect(() => {
        fetch(`${url}api/review/?type=0&referenceId=${props.arr.id}&avg=y`)
            .then(res => res.json())
                .then(res => {
                    let temp = []

                    for(let i = 0; i < Math.ceil(res[0]['avg']); i += 1) {
                        temp.push(<StarIcon />)
                    }

                    setStars(temp)
                    setAvgRating(res[0]['avg'])
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
                    <ModalHeader>Commenting on track <b>{props.arr.title}</b></ModalHeader>
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
            <Box w="100%">
                <Center>
                    <Card w="90%">
                        <CardHeader>
                            <Grid
                                h='20px'
                                templateColumns='repeat(5, 1fr)'
                                gap={4}
                            >
                                <GridItem colSpan={4}>
                                    <Heading size={props.size}>{props.arr.title}</Heading>
                                </GridItem>
                                <Center>
                                    {user ? <Tooltip label="Add Comment">
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={<ChatIcon />}
                                            onClick={addComment}
                                        />
                                    </Tooltip> : <></>}  
                                    <Tooltip label="Search on YouTube">
                                        <IconButton 
                                            id={id} 
                                            onClick={searchYoutube} 
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon = {<ExternalLinkIcon/> }                                       
                                        />
                                    </Tooltip>
                                    <GridItem colSpan={1}>
                                        { props.addBtn ? <Button 
                                            id={id} 
                                            onClick={select} 
                                            size='sm' 
                                            colorScheme={added ? 'red' : 'green'}
                                            isDisabled={user ? false : true}
                                        > 
                                            {btnMsg}
                                        </Button> : <></> }
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                                            onClick={changeContentState}
                                        />
                                    </GridItem>                                
                                </Center>
                            </Grid>
                            <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                            </Flex>
                        </CardHeader>
                        <Divider />
                        {isOpen ? 
                            <CardBody>
                                <Heading as="h5" size={props.size}>Performed by {props.arr.artistName}</Heading>
                                <Text><b>Average Rating: </b> {avgRating} - {stars.map((s) => <>{s}</>)}</Text>
                                <br />
                                <Heading size="h4">Reviews</Heading>
                                <Divider />
                                <ReviewList user={user.email} reference={props.arr.id} type={2} summary={true}></ReviewList>
                                <br />
                                {genre}
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

export default TrackView
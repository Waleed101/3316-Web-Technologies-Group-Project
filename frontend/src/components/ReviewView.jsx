import { React, useEffect, useState } from 'react'
import { useCookies }  from "react-cookie";

import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "../firebase.js"

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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tooltip,
    FormLabel,
    Input,
    Textarea,
    Select,
} from '@chakra-ui/react'

import {
    AddIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    StarIcon,
    ViewOffIcon,
    ViewIcon,
    WarningIcon,
} from '@chakra-ui/icons'

let url = require("../setup/api.setup.js")

function ReviewView (props) {

    const auth = getAuth();
    const [user, setUser] = useState(null) 
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })
    
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const toast = useToast()

    const [isHidden, setIsHidden] = useState(props.vals.isHidden)

    const [submittedBy, setSubmittedBy] = useState("")
    const [additionalInfo, setAdditionalInfo] = useState("")
    const [dateRequested, setDateRequested] = useState("")
    const [dateNotice, setDateNotice] = useState("")
    const [dateDispute, setDateDispute] = useState("")
    const [status, setStatus] = useState(0)

    const [isOpen, setIsOpen] = useState(false)
    const [takedownModal, setModalOpen] = useState(false)

    const openTakedownDialog = () => setModalOpen(true)
    const closeTakedownDialog = () => setModalOpen(false)

    const [takedown, setTakedown] = useState(null)

    const [stars, setStars] = useState([])

    const changeContentState = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setStars([]);

        for (let i = 1; i < props.vals.rating; i += 1) {
            stars.push(<StarIcon />)
        }
    
        setStars(stars)

        fetch(`${url}api/admin/takedown/${props.vals.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': cookies["user"].token
            },
        }).then(res => res.json())
            .then(res => {
                setTakedown(res.length == 0 ? null : res[0])

                if(takedown) {
                    setSubmittedBy(takedown.requestedBy)
                    setAdditionalInfo(takedown.additionalInfo)
                    setDateDispute(takedown.dateDispute)
                    setDateNotice(takedown.dateNotice)
                    setDateRequested(takedown.dateRequested)
                    setStatus(takedown.status)
                }
            })
    }, [])

    const create = () => {
        
    }

    const hideReview = () => {
        setIsHidden(!isHidden)

        let body = JSON.stringify({
            toHide: isHidden
        })

        fetch(`${url}api/admin/review/hide/${props.vals.id}`,{
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
            }).then(res => res.json())
            .then(res => {
                    if(!res.message) {
                        toast({
                            title: `Error Hiding Review`,
                            description: res.message,
                            status: 'error',
                            duration: 10000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: `Successfully Changed Review`,
                            description: "Review privacy was updated.",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                })
    }

    return(
        <>
             <Modal isOpen={takedownModal} onClose={closeTakedownDialog}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Review by {props.vals.userEmail}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormLabel> Submitted By: </FormLabel>
                            <Input
                                type = "email"
                                value = {submittedBy}
                                onChange = {(e) => setSubmittedBy(e.target.value)}
                                disabled={takedown ? true : false} 
                            />
                        <br /><br />
                        <FormLabel> Additional Info: </FormLabel>
                            <Textarea
                                placeholder = "Additional info submitted by user..."
                                value = {additionalInfo}
                                onChange = {(e) => setAdditionalInfo(e.target.value)}
                                disabled={takedown ? true : false} 
                            />
                        <br /><br />
                        <FormLabel> Dispute Date: </FormLabel>
                            <Input
                                type = "date"
                                value = {dateDispute}
                                onChange = {(e) => setSubmittedBy(e.target.value)}
                                disabled={takedown ? true : false} 
                            />
                        <br /><br />
                        <FormLabel> Notice Date: </FormLabel>
                            <Input
                                type = "date"
                                value = {dateNotice}
                                onChange = {(e) => setSubmittedBy(e.target.value)}
                            />
                        <br /><br />
                        <FormLabel> Requested Date: </FormLabel>
                            <Input
                                type = "date"
                                value = {dateRequested}
                                onChange = {(e) => setSubmittedBy(e.target.value)}
                            />
                        <br /><br />

                        <FormLabel> Status: </FormLabel>
                            <Select placeholder='Select a status' value={takedown ? takedown.status : ''}>
                                <option value='0'>Requested</option>
                                <option value='1'>Sent</option>
                                <option value='2'>Disputed</option>
                                <option value='3'>Closed, accepted</option>
                                <option value='4'>Closed, denied</option>
                            </Select>
                        <br /><br />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='ghost' mr={3} onClick={closeTakedownDialog}>
                        Close
                    </Button>
                    <Button colorScheme='green' mr={3} >
                        {takedown ? "Save" : "Create"}
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
                                <Heading size="sm">{stars.map((s) => <>{s}</>)} by {props.vals.userEmail}</Heading>
                            </GridItem>
                             <Center>
                                {props.access ? 
                                <>
                                    <GridItem colSpan={1}>
                                        <Tooltip label={(isHidden ? "Unhide" : "Hide") + " Review"}>
                                            <IconButton
                                                variant='ghost'
                                                colorScheme='gray'
                                                aria-label='See menu'
                                                icon={!isHidden ? <ViewIcon /> : <ViewOffIcon />}
                                                onClick={hideReview}
                                            />
                                        </Tooltip>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Tooltip label="Takedown Request">
                                            <IconButton
                                                variant='ghost'
                                                colorScheme={takedown ? 'orange' : 'gray'} 
                                                aria-label='See menu'
                                                icon={<WarningIcon/>}
                                                onClick={openTakedownDialog}
                                            />
                                        </Tooltip>
                                    </GridItem>
                                </>
                                :
                                <></>
                                }    
                                <GridItem colSpan={1}>
                                    <Tooltip label="Expand Content">
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                                            onClick={changeContentState}
                                        />
                                    </Tooltip>
                                </GridItem>     
                            </Center>
                        </Grid>
                        <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                        </Flex>
                    </CardHeader>
                    <Divider />
                        {   isOpen ? 
                                <CardBody>
                                    <Text>By: {props.vals.userEmail}</Text>
                                    <Text>{props.vals.description}</Text>
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

export default ReviewView
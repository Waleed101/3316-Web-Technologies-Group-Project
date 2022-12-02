import { React, useEffect, useState } from 'react'

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
} from '@chakra-ui/react'

import {
    AddIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons'

let url = require("../setup/api.setup.js")

function ReviewView (props) {

    const auth = getAuth();
    const [user, setUser] = useState(null) 
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user)
    })

    const [isOpen, setIsOpen] = useState(false)

    const changeContentState = () => {
        setIsOpen(!isOpen)
    }

    console.log(props)

    const hideReview = () => {
        let body = JSON.stringify({
            toHide: 1
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
                        alert(`Error: ${res.message}`)
                    } else {
                        alert(res.message)
                    }
                })
    }

    return(
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
                                <Heading size="sm">{props.vals.rating}</Heading>
                            </GridItem>
                             <Center>
                                <GridItem colSpan={1}>
                                    <IconButton
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='See menu'
                                        icon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                                        onClick={changeContentState}
                                    />
                                </GridItem>
                                {props.access ? 
                                <GridItem>
                                    <Button onClick={hideReview}>Hide</Button>
                                </GridItem>
                                :
                                <></>
                                }         
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
    )
}

export default ReviewView
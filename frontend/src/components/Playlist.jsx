import { React, useState } from 'react'
import { useCookies } from 'react-cookie'

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
} from '@chakra-ui/react'

function Playlist (props) {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    return(
        <Box w="50%">
            <Center>
                <Card w="90%">
                    <CardHeader>
                        <Grid
                            h='25px'
                            templateColumns='repeat(5, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={4}>
                                <Heading size="md">{props.arr.title}</Heading>
                            </GridItem>
                            <Center>
                                <GridItem colSpan={1}>
                                    <Button 
                                        id={id} 
                                        onClick={select} 
                                        size='sm' 
                                        colorScheme={added ? 'red' : 'green'}
                                        isDisabled={!isBtnDisabled}
                                    >
                                        {btnMsg}
                                    </Button>
                                </GridItem>
                            </Center>
                        </Grid>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Heading as="h5" size="md">Performed by {props.arr.artistName}</Heading>
                        {genre}
                    </CardBody>
                </Card>
            </Center>
        </Box>
    )
}

export default Playlist
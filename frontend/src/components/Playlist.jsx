import { React, useState } from 'react'
import { useCookies } from 'react-cookie'

import TrackList from '../components/TrackList'

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
} from '@chakra-ui/react'

import {
    AddIcon,
    HamburgerIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons'

function Playlist (props) {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [isOpen, setIsOpen, setIsClosed] = useState(false)

    const getDate = (val, split) => {
        return val.split(split)[0]
    }

    const changeContentState = () => {
        setIsOpen(!isOpen)
    }

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
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Box>
                                            <Heading size='sm'>{props.vals.name}</Heading>
                                            <Text fontSize="xs" as="i">
                                                Last Updated on {props.vals.updated == "0000-00-00 00:00:00" ? getDate(props.vals.created, "T") : getDate(props.vals.updated, " ")}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                                            onClick={changeContentState}
                                        />
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={props.vals.isPublic ? <ViewIcon /> : <ViewOffIcon />}
                                        />
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={<HamburgerIcon />}
                                        />
                                    </Flex>
                                </Flex>                                
                            </GridItem>
                            <Center>
                                <GridItem colSpan={1}>
                                    {/* <Button 
                                        id={id} 
                                        onClick={select} 
                                        size='sm' 
                                        isDisabled={!isBtnDisabled}
                                    >
                                        
                                    </Button> */}
                                </GridItem>
                            </Center>
                        </Grid>
                    </CardHeader>
                    <Divider />
                    {
                        isOpen ?
                            <CardBody>
                                <Text>Your list has {props.vals.numberOfTracks} track{props.vals.numberOfTracks > 1 ? 's' : ''}</Text>
                                <TrackList tracks={props.vals.tracks.split(",")}></TrackList>
                            </CardBody> 
                        : 
                            <></>
                    }
                </Card>
            </Center>
        </Box>
    )
}

export default Playlist
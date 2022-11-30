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
    Flex,
    IconButton,
} from '@chakra-ui/react'

import {
    AddIcon,
    ExternalLinkIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons'

function TrackView (props) {
    console.log(props.arr)
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [isOpen, setIsOpen] = useState(false)

    const ADD_TO = <AddIcon />
    const REMOVE_FROM = <MinusIcon />

    const [added, setAdded] = useState(props.isSelected)
    const [btnMsg, setBtnMsg] = useState(props.isSelected ? REMOVE_FROM : ADD_TO)

    const COLORS = ["teal", "blue", "green", "cyan", "red"]

    console.log(props.isSelected)

    const isBtnDisabled = () => {
        if (cookies['user']) {
            return !cookies['user'].isLoggedIn
        } else {
            return true
        }
    }

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
                                <Heading size={props.size}>{props.arr.title}</Heading>
                            </GridItem>
                             <Center>
                                <GridItem colSpan={1}>
                                    <IconButton 
                                        id={id} 
                                        onClick={searchYoutube} 
                                        size='sm' 
                                        colorScheme={'red'}
                                        icon = {<ExternalLinkIcon/> }
                                        
                                    
                                       
                                    /> 
                                    
                                </GridItem>
                                <GridItem colSpan={1}>
                                    {props.addBtn ? <Button 
                                        id={id} 
                                        onClick={select} 
                                        size='sm' 
                                        colorScheme={added ? 'red' : 'green'}
                                        isDisabled={!isBtnDisabled}
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
                            <br/>
                            {genre}
                        </CardBody>
                        :
                        <></>
                    }                    
                </Card>
            </Center>
        </Box>
    )
}

export default TrackView
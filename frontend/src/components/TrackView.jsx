import { React, useState } from 'react'

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

import {
    AddIcon,
    MinusIcon,
} from '@chakra-ui/icons'

function TrackView (props) {

    const ADD_TO = <AddIcon />
    const REMOVE_FROM = <MinusIcon />

    const [added, setAdded] = useState(false)
    const [btnMsg, setBtnMsg] = useState(ADD_TO)

    const COLORS = ["teal", "blue", "green", "cyan", "red"]

    let genre = []
    
    props.arr.genres.forEach(g => {
        genre.push(<Tag size='md' variant='solid' colorScheme={COLORS[g.id % (COLORS.length)]}>{g.title}</Tag>)
    })

    const id = "addTo" + props.arr.id

    const select = () => {
        if (!added) {
            props.selectTrack(props.arr.id)
        } else {
            props.removeTrack(props.arr.id)
        }

        setBtnMsg(added ? ADD_TO : REMOVE_FROM)
        setAdded(!added)
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
                                <Heading size="md">{props.arr.title}</Heading>
                            </GridItem>
                            <Center>
                                <GridItem colSpan={1}>
                                    <Button 
                                        id={id} 
                                        onClick={select} 
                                        size='sm' 
                                        colorScheme={added ? 'red' : 'green'}
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

export default TrackView
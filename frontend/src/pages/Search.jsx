import { React, useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

import TrackView from "../components/TrackView";
import CustomAlert from "../components/CustomAlert";

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Input,
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Textarea,
    Switch,
  } from '@chakra-ui/react'

let url = require("../setup/api.setup.js")

function Search() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const [title, setTitle] = useState("")
    const [genre, setGenre] = useState([])
    const [artist, setArtist] = useState("")

    // Creating the list form
    const [listTitle, setListTitle] = useState("")
    const [listDescription, setListDescription] = useState("")

    const [availGenres, setAvailGenres] = useState([])

    const [result, setResult] = useState([])
    const [createState, setCreateState] = useState(null)

    const [numOfTracksQueued, setNumOfTracksQueued] = useState(0)
    const [tracks, setTracks] = useState({})
    const [trackTable, setTrackTable] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()

    let tracksSelected = {}

    const createNewList = () => {
        let tempTrackTable = []

        for (const[k, v] of Object.entries(tracks)) {
            tempTrackTable.push(<Tr><Td>{k}</Td><Td>{v}</Td></Tr>)
        }

        setTrackTable(tempTrackTable)
        onOpen()
    }

    const handleSelect = function(selectedItems) {
        const genre = []

        for (let i=0; i < selectedItems.length; i++) {
            genre.push(selectedItems[i].value)
        }

        setGenre(genre)
    }

    const selectTrack = (id, title) => {
        console.log("Selecting track " + id)
        tracksSelected[id] = title
        setTracks(tracksSelected)
        setNumOfTracksQueued(Object.keys(tracksSelected).length)
    }

    const removeTrack = (id) => {
        console.log("Removing track " + id)
        delete tracksSelected[id]
        setTracks(tracksSelected)
        setNumOfTracksQueued(Object.keys(tracksSelected).length)
    }

    const search = (event) => {
        event.preventDefault();

        let output = []

        let query = `?title=${title}&artist=${artist}&genres=${genre.join(",")}`

        fetch(url + "api/track/" + query)
            .then(res => res.json())
                .then(res => {
                    if(res.message) {
                        return
                    }
                    res.forEach(record => {
                        output.push(<TrackView selectTrack={selectTrack} removeTrack={removeTrack} arr={record}  addBtn={true} size={'md'} />) 
                    })
                    setResult(output)
                })
    } 

    const addList = () => {
        let body = JSON.stringify({
            "user": cookies["user"].email,
            "title": listTitle,
            "description": listDescription,
            "isPublic": document.getElementById("isPublic").checked,
            "tracks": Object.keys(tracks)
        })

        console.log(body)

        fetch(url + "api/list/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => res.json())
            .then(res => {
                if (res.message) {
                    setCreateState(<CustomAlert isError={true} msg={res.message}></CustomAlert>)
                } else {
                    setCreateState(<CustomAlert isError={false} msg={'Successfully created ' + res.title + " playlist."}></CustomAlert>)
                }
                console.log(createState)
            })
    }

    useEffect(() => {

        fetch(url + "api/genre/")
            .then(res => res.json())
                .then(res => {
                    let availGenres = []

                    res.forEach(ele => {
                        availGenres.push(<option value={ele.id.toString()}>{ele.title}</option>)
                    })

                    setAvailGenres(availGenres)

                })
    }, [])

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                motionPreset='slideInBottom'
                w="500px"
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a New Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormLabel> Title: </FormLabel>
                            <Input
                                type = "text"
                                value = {listTitle}
                                onChange = {(e) => setListTitle(e.target.value)}
                            />
                        <br></br><br></br>
                        <FormLabel> Description: </FormLabel>
                            <Textarea
                                placeholder = "Enter a description of your playlist..."
                                value = {listDescription}
                                onChange = {(e) => setListDescription(e.target.value)}
                            />
                        <br></br><br></br>
                        <Stack align='center' direction='row'>
                            <FormLabel> Public: </FormLabel>
                                <Switch size="md" id="isPublic"/> 
                        </Stack>
                    </form>
                    <br></br>
                    <FormLabel> Tracks: </FormLabel>
                    <TableContainer>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Title</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {trackTable}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Title</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={addList}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>

            <Button id="createList" onClick={createNewList} disabled={numOfTracksQueued==0}>Add {numOfTracksQueued} to a list</Button>
            {createState}
            <form onSubmit={search}>
                <Stack spacing={8} direction='row'>
                    <FormLabel> Title: </FormLabel>
                        <Input
                            type = "text"
                            value = {title}
                            onChange = {(e) => setTitle(e.target.value)}
                        />
                    <FormLabel> Artist: </FormLabel>
                        <Input
                            type = "text"
                            value = {artist}
                            onChange = {(e) => setArtist(e.target.value)}
                        />
                    <FormLabel> Genre: </FormLabel>
                        <select id="genreSelect" multiple={true} value={genre} onChange={(e) => {handleSelect(e.target.selectedOptions)}}>
                            {availGenres}
                        </select>
                    <Button type = "submit">
                        Submit
                    </Button>
                </Stack>
            </form>
            <Stack spacing={8}>
                {result.map(r => <>{r}</>)}
            </Stack>
        </>
    );
}

export default Search;
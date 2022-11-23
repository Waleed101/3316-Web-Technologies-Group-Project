import { useEffect } from 'react'
import { React, useState } from 'react'
import { useCookies } from 'react-cookie'

import {
    Text,
    Spinner,
} from '@chakra-ui/react'

import TrackView from "../components/TrackView";

let url = require("../setup/api.setup.js")

function TrackList(props) {

    const [tracks, setTracks] = useState([<Spinner />])

    console.log(props.tracks)

    useEffect(() => {
        let temp = []
        for (let i = 0; i < props.tracks.length; i += 1) {
            fetch(`${url}api/track/${props.tracks[i]}`)
                .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        temp.push(<TrackView arr={res} addBtn={false} size={'s'} />)
                        if (i == props.tracks.length - 1) {
                            setTracks(temp)
                        } 
                    })
        }
    }, [])

    return tracks.map((t) => <>{t}</>)
}

export default TrackList;

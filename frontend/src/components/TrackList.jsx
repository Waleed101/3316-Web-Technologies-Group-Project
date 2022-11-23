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

    // const [gotTracks, setGotTracks] = useState(false)
    const [tracks, setTracks] = useState([])

    // const tracks = []

    useEffect(() => {

        var getListInfo = new Promise((resolve, reject) => {
            let temp = []
            for (let i = 0; i < props.tracks.length; i += 1) {
                fetch(`${url}api/track/${props.tracks[i]}`)
                    .then(res => res.json())
                        .then(res => {
                            console.log(res)
                            temp.push(<TrackView arr={res}></TrackView>)
                            if (i == props.tracks.length - 1) {
                                setTracks(temp)
                                resolve();
                            } 
                        })
            }
          });

        getListInfo.then(() => {
            // console.log(tracks)
            // setGotTracks(true)
        })
    
    })

    return tracks.map((t) => <>{t}</>)

    // return gotTracks ? <ul> {
    //                         tracks.map((t) => <Text>t.id</Text>
    //                     )}</ul> : <Spinner />

    // return gotTracks ? <ul>{tracks.map(function(item, i) {
    //     console.log('test')
    //     return <li key={item.id}>Test</li>
    // })}</ul> : <Spinner />
}

export default TrackList;

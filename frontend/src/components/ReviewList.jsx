import { useEffect } from 'react'
import { React, useState } from 'react'
import { useCookies } from 'react-cookie'

import {
    Text,
    Spinner,
} from '@chakra-ui/react'

import ReviewView from "../components/ReviewView";

let url = require("../setup/api.setup.js")

function ReviewList(props) {

    const [reviews, setReviews] = useState([<Spinner />])

    console.log(props.reviews)

    useEffect(() => {
        
        let reference = props.reference ? props.reference : ""
        let type = props.type ? props.type : ""
        let user = props.user ? props.user : ""

        let temp = []

        fetch(`${url}api/review/?ref=${reference}&type=${type}&user=${user}`)
            .then(res => res.json())
                .then(res => {
                    if(!res) {
                        setReviews([])
                    } else {
                        for(let i = 0; i <= res.length; i++) {
                            if (i == res.length) {
                                setReviews(temp)
                                break
                            }
                            temp.push(<ReviewView vals={res[i]} />)
                        }
                    }
                    
                })
    }, [])

    return reviews.map((r) => <>{r}</>)
}

export default ReviewList;

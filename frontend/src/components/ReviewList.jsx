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
    const [cookies, setCookie, removeCookie] = useCookies(["user"])


    useEffect(() => {
        
        let reference = props.reference ? props.reference : ""
        let type = props.type ? props.type : ""

        if(props.type == 2) {
            type = 0
        }

        let user = props.user ? props.user : ""
        let access = props.access ? props.access : ""

        let temp = []

        let query = `${url}api/review/?ref=${reference}&type=${type}&user=${user}`

        if (access == "admin") {
            query = `${url}api/admin/review`
        }

        console.log(query)

        fetch(query, {
            'Authorization': cookies["user"].token ? cookies["user"].token : ""
        }) 
            .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if(res.length == 0) {
                        setReviews([<Text>No Reviews found for this.</Text>])
                    } else {
                        for(let i = 0; i <= res.length; i++) {
                            if (i == res.length) {
                                setReviews(temp)
                                break
                            }
                            temp.push(<ReviewView vals={res[i]} access={access}/>)
                        }
                    }
                    
                })
    }, [])

    return reviews.map((r) => <>{r}</>)
}

export default ReviewList;

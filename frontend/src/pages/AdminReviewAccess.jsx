import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { 
    Button, 
    Input,
    InputGroup,
    InputRightElement,
    FormLabel
 } from '@chakra-ui/react'

import ReviewList from "../components/ReviewList"

let url = require("../setup/api.setup.js")

function AdminReviewAccess() {
    return (
        <>
            <ReviewList access="admin"/>
        </>
    )
}

export default AdminReviewAccess
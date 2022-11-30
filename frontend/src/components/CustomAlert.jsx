import { React, useEffect } from 'react'

import {
    Alert,
    AlertIcon,
    CloseButton,
    Box,
    useDisclosure,
} from '@chakra-ui/react'

function CustomAlert (props) {
    return (<Alert status={ props.isError ? 'error' : 'success' } variant='subtle'>
        <AlertIcon />
            <Box>
                {props.msg}
            </Box>
        </Alert>)
}

export default CustomAlert

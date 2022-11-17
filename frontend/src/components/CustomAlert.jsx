import { React } from 'react'

import {
    Alert,
    AlertIcon,
    CloseButton,
    Box,
    useDisclosure,
} from '@chakra-ui/react'

function CustomAlert (props) {
    const {
        isOpen: isVisible,
        onClose,
      } = useDisclosure({ defaultIsOpen: true })

    console.log(isVisible)

    return (isVisible ? <Alert status={ props.isError ? 'error' : 'success' } variant='subtle'>
        <AlertIcon />
            <Box>
                {props.msg}
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert> : <></>)
}

export default CustomAlert

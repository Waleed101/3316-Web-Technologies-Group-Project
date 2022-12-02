import { React, useDebugValue, useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    Text,
    Heading,
    InputGroup,
    ListItem,
    OrderedList,
    Select,
    UnorderedList,
  } from '@chakra-ui/react'
import { render } from 'react-dom';

let url = require("../setup/api.setup.js")


function Policies() {

const [selectedPolicy, setSelectedPolicy] = useState(null)
const [cookies, setCookie, removeCookie] = useCookies(["user"])
const [editMode, setEditMode] = useState(false)
const [security, setSecurity] = useState("")
const [AUP, setAUP] = useState("")
const [DMCA, setDMCA] = useState("")
const [Input, setInput] = useState("")



const editPolicy = () => {
     setEditMode(true)
     setInput(document.getElementById(selectedPolicy).textContent)
}

const submit = (event) => {
     event.preventDefault()
     const newPolicy = document.getElementById('inputField').value
     let body = JSON.stringify({
          "type": selectedPolicy,
          "content": newPolicy
      })
     fetch(url + 'api/admin/policy', {
          method: 'PUT',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': cookies["user"].token
          },
          body: body
     })
     window.location.reload(false)
}
useEffect(() => {
     let AllPolicies = ['security', 'AUP', 'DMCA']
     AllPolicies.forEach(policyType => {
          fetch(url + "api/policy/" + policyType)
          .then(res => res.json())
              .then(res => {
               if (policyType == 'security')
                  setSecurity(res[0].content)

               if (policyType == 'AUP')
                  setAUP(res[0].content)

               if (policyType == 'security')
                  setDMCA(res[0].content)
               })
     });
     
}, [])
     
    return (
     <>
     {(cookies['user'] && cookies['user'].role == 2 && !editMode) ?
          <form onSubmit={editPolicy}>
               <Select placeholder='Please select a policy...' onChange={(e) => {setSelectedPolicy(e.target.selectedOptions[0].value)}}>
                    <option value='security'>Security Policy</option>
                    <option value='AUP'>Accceptable Use Policy</option>
                    <option value='DMCA'>DMCA Notice & Takedown</option>
               </Select>
               <Button type = "submit">
                    Edit Policy
               </Button>
          </form> : <></>}
     {(editMode) ?
     <form onSubmit={submit}>
          <InputGroup size='md'>
                <FormLabel>
                    Edit {selectedPolicy}
                </FormLabel>
                <input id="inputField"
                    pr='4.5rem'
                    size='lg'
                    defaultValue={Input}
                />
            </InputGroup>
            <Button type = "submit" width="full">
                Submit
            </Button>
     </form>
     : <></>}
     <div>
     <Heading>
      Security Policy
      </Heading>
      <Text id='security'>
     {security}
</Text>
</div>
<br/>
<div>
<Heading>
      Acceptable Use Policy
      </Heading>
      <Text id='AUP'>
     	{AUP}
</Text>
</div>
<br/>
<div>
     <Heading>
      DMCA Notice & Takedown Policy
      </Heading>
      <Text id="DMCA">
    {DMCA}
</Text>
</div>
     </> 
    )
    
}
export default Policies;
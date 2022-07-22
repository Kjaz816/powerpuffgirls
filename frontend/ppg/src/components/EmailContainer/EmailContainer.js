import React, { useState, useEffect } from 'react'
import Email from "../Email/Email"
import './EmailContainer.css'

import axios from 'axios'
import gmailApi from 'react-gmail'

const apiKey = 'AIzaSyAjlSDRDAKuXZGq880CWj6Bp5yE-WE5_mk'
const clientID = '777744513405-2rvtat7snd0men32u5cc84l6rt9hsmq1.apps.googleusercontent.com'
const clientSecret = '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'

const getHeader =  {
    headers: {
        "Authorization": `Bearer ${clientID}`,
        "Accept": 'application/json'
    }
}

const gapi = window.gapi;


const EmailContainer = ({signedIn, user}) => {

    const [emailList, setEmailList] = useState([]);
    const [messages, setMessages] = useState([]);

    const retrieveUserEmails = async () => {
        const userMessagesURL = `https://gmail.googleapis.com/gmail/v1/users/${user.sub}/messages?maxResults=6&q=is%3Bunread&key=${apiKey}`;
        console.log(userMessagesURL);
        const response = await(axios.get(userMessagesURL));
        console.log(response.data);
        setEmailList(response.data);        
    }

    function execute() {
        return gapi.client.gmail.users.messages.list({})
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                  },
                  function(err) { console.error("Execute error", err); });
      }

      const retrieveMessages = () => {
        gmailApi.getMessages(true,5).then(res => {
            setMessages(gmailApi.normaliseData(res))
            console.log(gmailApi.normaliseData(res))
        })
      }

  return (
    <div className='email-container'>
        <button onClick={retrieveMessages}>Get User Emails</button>
        <Email/><Email/><Email/><Email/><Email/><Email/>
    </div>
  )
}

export default EmailContainer
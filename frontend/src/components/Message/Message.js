import React, { useState } from 'react'
import './Message.css'
import Speaker from '../Speaker/Speaker'

const Message = ({ message }) => {
    const [loadingMsg, setLoadingMsg] = useState(true);

    return (
        <div className='message'>
            {decodeURIComponent(message.snippet)}
            <Speaker messageSnippet={message.snippet}/>
        </div>
    )
}

export default Message
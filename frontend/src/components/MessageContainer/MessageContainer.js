import React, { useEffect } from 'react'
import Message from '../Message/Message'
import './MessageContainer.css'

const MessageContainer = ({messages}) => {

    const renderMessages = () => {
        return messages.map(message => <Message message={message}/>)
    }

    return (
    <div className='message-container'>
        {renderMessages()}
    </div>
)
}

export default MessageContainer
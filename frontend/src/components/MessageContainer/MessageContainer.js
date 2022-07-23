import React, { useEffect } from 'react'
import './MessageContainer.css'

const MessageContainer = ({messages}) => {
    useEffect(() => {
        if(messages.length > 0) {
            console.log(`Hello There`)
            console.log(messages)
        }
    });

    const renderMessages = () => {
        return (
        messages.map(message => {
            return (<div className='message'>
                {message.id}
            </div>)
        }));
    }

    return (
    <div className='message-container'>
        {renderMessages()}
    </div>
)
}

export default MessageContainer
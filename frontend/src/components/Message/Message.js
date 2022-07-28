import React, { useState } from 'react'
import './Message.css'
import Speaker from '../Speaker/Speaker'

const Message = ({ message, voiceIndex }) => {
    const [loadingMsg, setLoadingMsg] = useState(true);
    const [playing, setPlaying] = useState(false);

    return (
        <div className={`message ${playing && 'playing'}`}>
            {decodeURIComponent(message.snippet)}
            <Speaker messageSnippet={message.snippet} voiceIndex={voiceIndex} setPlaying={setPlaying}/>
        </div>
    )
}

export default Message
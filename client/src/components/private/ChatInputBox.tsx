import React, { useState } from 'react'
import { CREATE_MESSAGE } from '../../mutations/chatMutations'
import { useMutation } from '@apollo/client';


interface Props {

}

const ChatInputBox: React.FC<Props> = () => {

    const [message, setMessage] = useState("")

    const postChatMessageInput = {
      message: message
    }

    const [postMessage, {error, data }] = useMutation(CREATE_MESSAGE, {
        variables: { postChatMessageInput },
    });

    const sendMessage = async() => {
      const res = await postMessage()
    }

  return (
    <div>
        <div>Chat</div>
        <div>
            <label htmlFor="text">Email:</label>
            <input type="text" value={message}  onChange={(e) => setMessage(e.target.value)} placeholder="Send a message" />
        </div>
        <button onClick={() => sendMessage()}>send message</button>
        <button onClick={() => console.log(data)}>log data</button>
    </div>

  )
}

export default ChatInputBox
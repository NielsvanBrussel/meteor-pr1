import React, { useState } from 'react'
import ChatDisplayBox from './ChatDisplayBox'
import ChatInputBox from './ChatInputBox'



interface Props {

}

const Chat: React.FC<Props> = () => {


  return (
    <div>
        <div>Chat</div>
        <ChatDisplayBox />
        <ChatInputBox />
    </div>

  )
}

export default Chat
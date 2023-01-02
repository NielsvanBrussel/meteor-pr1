import React, { useState, useEffect } from 'react'
import { CHAT_SUBSCRIPTION } from '../../subscriptions/chatSubscriptions'
import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../../queries/chatQueries';


interface Props {

}

const ChatDisplayBox: React.FC<Props> = () => {


    interface StateProperties {
        id: String,
        user: String,
        message: String,
        date_created: String,
      }

    const [messages, setMessages] = useState<StateProperties[]>([])


    useEffect(() => {
        console.log(messages)
    }, [messages])
    
    
    const initMessagesQuery = useQuery(GET_MESSAGES, {
        // pollInterval: 5000,
        fetchPolicy: 'network-only',
        pollInterval: 0, 
        onCompleted: (data) => {
          if (data.chatMessages) {
            setMessages(data.chatMessages)
          }
        }
      }); 

    const subMessages = useSubscription(CHAT_SUBSCRIPTION, {
        onData: ({data}) => {
            console.log(data?.data?.newChatMessage)
            setMessages((prevState) => [...prevState, data.data.newChatMessage])
           
        }
    });

  return (
    <div>
        <div>Chat display</div>
        {messages?.map((item: any) => 
                      <div style={{ color: "white"}}>{item?.message}</div>
                  )}
    </div>

  )
}

export default ChatDisplayBox
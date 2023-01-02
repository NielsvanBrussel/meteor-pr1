const ChatMessage = require('../models/ChatMessage');
const { GraphQLError } = require('graphql');

const NEW_MESSAGE = "123" // same as in subscription resolver

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function chatMessages() {
    console.log('chatmessages called') 
    return await ChatMessage.find()
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function postChatMessage(parent, { postChatMessageInput }, { res, req, pubsub }) {
    console.log("addChatMessage called")
    
    // create the new message
    const chatMessage = new ChatMessage({
        message: postChatMessageInput.message,
        user: "63724064c20481c6bd177865"
    });
    chatMessage.save()
    
    pubsub.publish(NEW_MESSAGE, { newChatMessage: chatMessage })
    

    return { message: 'message created', success: true }; 

    // check if user is logged in

    if (!req.session.user_id) {
        throw new GraphQLError('Unauthorized', {
            extensions: {
                code: 'Unauthorized'
            }
        })
    } else { 

        // create the new message
        const chatMessage = new ChatMessage({
            message: postChatMessageInput.message,
            user: req.session.user_id
        });

        pubsub.publish("NEW_MESSAGE", { newMessage: chatMessage })
        chatMessage.save()

        return { message: 'message created', success: true };            
    }
}


module.exports = {
    chatMessages,
    postChatMessage,
}
const {
    GraphQLObjectType,
    GraphQLScalarType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLError,
    GraphQLBoolean
} = require('graphql');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        date_created: { type: GraphQLString },
        date_active: { type: GraphQLString },
    })
})


const ChatMessageType = new GraphQLObjectType({
    name: 'ChatMessage',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: GraphQLID },
        message: { type: GraphQLString },
        date_created: { type: GraphQLString },
    })
})

const TestType = new GraphQLObjectType({
    name: 'TestAuth',
    fields: () => ({
        message: { type: GraphQLString }
    })
})


const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        authenticated: { type: GraphQLBoolean }
    })
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        message: { type: GraphQLString }
    })
})

const ChatMessagesType = new GraphQLList(ChatMessageType)
    


const TestSubType = new GraphQLList(ChatMessageType)

module.exports = { 
    UserType: UserType, 
    TestType: TestType,
    MessageType: MessageType,
    AuthType: AuthType,
    TestSubType: TestSubType,
    ChatMessageType: ChatMessageType,
    ChatMessagesType: ChatMessagesType,
}



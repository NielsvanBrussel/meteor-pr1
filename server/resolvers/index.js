const User = require('../models/User');
const { register, login, logout, checkAuth } = require('./authResolvers')
const { chatMessages, postChatMessage } = require("./chatResolvers")


const NEW_MESSAGE = "123" // same as in postChatMessage resolver

const resolvers = {
    Query: {

        user: async(_, args, { req, res, pubsub }) => {
            console.log('User called')
            console.log(pubsub)
            return await User.findById(args.id)
        },

        chatMessages: chatMessages,

        checkAuth: checkAuth,

    },
    Mutation: {

        register: register,

        login: login,

        logout: logout,
        
        postChatMessage: postChatMessage,

    },
    Subscription: {
        newChatMessage: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator(NEW_MESSAGE)
            }
        }
    },
  };


  module.exports = {
    resolvers: resolvers
  }
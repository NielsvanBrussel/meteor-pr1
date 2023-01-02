const typeDefs = `#graphql
  type Query {
    user(id: String!): User
    chatMessages: [ChatMessage]
    checkAuth: Boolean
  }

  type Mutation {
    register(registerInput: RegisterInput): Response!
    login(loginInput: LoginInput!): Response!
    logout: Response!
    postChatMessage(postChatMessageInput: PostChatMessageInput!): Response!
  }

  type Subscription {
    newChatMessage: ChatMessage!
  }

  type User {
    id: ID,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    date_created: String,
    date_active: String,
  }

  type ChatMessage {
    id: ID,
    user: ID,
    message: String,
    date_created: String,
  }

  input RegisterInput {
    first_name: String!,
    last_name: String!,
    email: String!,
    password: String!,
  }

  input LoginInput {
    email: String!,
    password: String!,
  }

  input PostChatMessageInput {
    message: String!
  }

  type Response {
    message: String
    success: Boolean
  }



`;


module.exports = {
    typeDefs: typeDefs
}
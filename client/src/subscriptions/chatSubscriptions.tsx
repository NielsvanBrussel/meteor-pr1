import { gql } from '@apollo/client';

const CHAT_SUBSCRIPTION = gql`
  subscription newChatMessage {
    newChatMessage {
        date_created
        id
        message
        user
    }
  }
`;


export { 
 CHAT_SUBSCRIPTION,
};
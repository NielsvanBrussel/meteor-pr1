import { gql } from '@apollo/client';

const GET_MESSAGES = gql`
  query chatMessages {
    chatMessages {
        id
        date_created
        message
        user
    }
  }
`;


export { 
  GET_MESSAGES,
};
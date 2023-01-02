import { gql } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation postChatMessage($postChatMessageInput: PostChatMessageInput!) {
    postChatMessage(postChatMessageInput: $postChatMessageInput) {
        message
        success
    }
  }
`;

export { CREATE_MESSAGE, };
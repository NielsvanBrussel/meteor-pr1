import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      success
      message
    }
  }
`;



const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      message
    }
  }
`;

const LOGOUT_USER = gql`
  mutation logout {
    logout {
      success
      message
    }
  }
`;




export { CREATE_USER, LOGIN_USER, LOGOUT_USER };
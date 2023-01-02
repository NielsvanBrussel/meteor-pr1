import { gql } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    users {
      id
      first_name
      last_name
      email
      password
    }
  }
`;

const CHECK_AUTH = gql`
  query checkAuth {
    checkAuth 
  }
`;

const TEST_AUTH = gql`
  query testAuth {
    testAuth {
      message
    }
  }
`;

export { 
  GET_USERS,
  CHECK_AUTH,
  TEST_AUTH,

};
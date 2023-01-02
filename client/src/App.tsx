import AppRouter from "./AppRouter"
import { GlobalProvider } from "./context/GlobalState"
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import './App.css';


// http link for queries and mutations
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});


// ws link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
}));


// functions to decide which link to use
// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <GlobalProvider>
          <AppRouter />
        </GlobalProvider>        
      </ApolloProvider>
    </div>
  );
}

export default App;

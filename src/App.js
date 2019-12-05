import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { useAuth0 } from "./components/Auth/react-auth0-spa";
import NavBar from "./components/NavBar";
import NoteInput from "./components/NoteInput";
import { NotesPrivateListQuery } from "./components/NotesPrivate";

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://assigment-notes.herokuapp.com/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache()
  });
};

function App({ idToken }) {
  console.log(idToken);
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }

  const client = createApolloClient(idToken);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar logoutHandler={logout} />
        <NoteInput />
        <NotesPrivateListQuery />
      </div>
    </ApolloProvider>
  );
}

export default App;

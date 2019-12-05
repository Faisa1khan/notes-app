import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Note from "./NotePrivate";

export const GET_MY_NOTES = gql`
  query {
    notes(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      description
      created_at
      is_completed
      user {
        name
        id
      }
    }
  }
`;

export const NotesPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <ul className="noteList">
      {data.notes.map(({ title, description, is_completed, id }) => (
        <li key={id}>
          <Note
            title={title}
            description={description}
            is_completed={is_completed}
            id={id}
          />
        </li>
      ))}
    </ul>
  );
};

import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_MY_NOTES } from "./NotesPrivate";

const TOGGLE_COMPLETE = gql`
  mutation($id: Int!, $isCompleted: Boolean!) {
    update_notes(
      where: { id: { _eq: $id } }
      _set: { is_completed: $isCompleted }
    ) {
      affected_rows
    }
  }
`;

const Note = ({ title, description, is_completed, id }) => {
  console.log(id, is_completed);
  const [toggle] = useMutation(TOGGLE_COMPLETE);

  const toggleComplete = () => {
    toggle({
      variables: { id, isCompleted: !is_completed }
      //   optimisticResponse: null,
      //   update: cache => {
      //     const existingNotes = cache.readQuery({ query: GET_MY_NOTES });
      //     const newNotes = existingNotes.notes.map(t => {
      //       if (t.id === id) {
      //         return { ...t, is_completed: !t.is_completed };
      //       } else {
      //         return t;
      //       }
      //     });
      //     console.table(newNotes.notes);
      //     cache.writeQuery({
      //       query: GET_MY_NOTES,
      //       data: { Notes: newNotes }
      //     });
      //   }
    });
  };
  return (
    <section className="noteWrapper">
      <span className="delete">X</span>
      <div className="noteCard">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <input type="checkbox" checked={is_completed} onChange={toggleComplete} />
    </section>
  );
};

export default Note;

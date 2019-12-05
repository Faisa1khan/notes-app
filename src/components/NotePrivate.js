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
      returning {
        id
        title
        description
        created_at
        is_completed
      }
    }
  }
`;

const DELETE_NOTE = gql`
  mutation removeTodo($id: Int!) {
    delete_notes(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        title
        description
        created_at
        is_completed
      }
    }
  }
`;

const Note = ({ title, description, is_completed, id }) => {
  const [toggle] = useMutation(TOGGLE_COMPLETE);
  const [deleteNote] = useMutation(DELETE_NOTE);

  const toggleComplete = () => {
    toggle({
      variables: { id, isCompleted: !is_completed },
      optimisticResponse: null,
      update: cache => {
        const existingNotes = cache.readQuery({ query: GET_MY_NOTES });
        const newNotes = existingNotes.notes.map(t => {
          if (t.id === id) {
            return { ...t, is_completed: !is_completed };
          } else {
            return t;
          }
        });

        cache.writeQuery({
          query: GET_MY_NOTES,
          data: { notes: newNotes }
        });
      }
    });
  };

  const handleDelete = () => {
    deleteNote({
      variables: { id },
      optimisticResponse: null,
      update: cache => {
        const existingNotes = cache.readQuery({ query: GET_MY_NOTES });
        const newNotes = existingNotes.notes.filter(t => t.id !== id);
        cache.writeQuery({
          query: GET_MY_NOTES,
          data: { notes: newNotes }
        });
      }
    });
  };

  return (
    <section className="noteWrapper">
      <button className="delete" onClick={handleDelete}>
        <span>X</span>
      </button>
      <div className="noteCard">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <input type="checkbox" checked={is_completed} onChange={toggleComplete} />
    </section>
  );
};

export default Note;

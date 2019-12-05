import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_MY_NOTES } from "./NotesPrivate";

const ADD_TODO = gql`
  mutation($des: String!, $title: String, $isPublic: Boolean!) {
    insert_notes(
      objects: { description: $des, title: $title, is_public: $isPublic }
    ) {
      affected_rows
      returning {
        created_at
        description
        id
        is_public
        title
      }
    }
  }
`;

const NoteInput = ({ isPublic = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");
  const updateCache = (cache, { data }) => {
    if (isPublic) {
      return null;
    }

    // fetch the existing notes
    const existingNotes = cache.readQuery({
      query: GET_MY_NOTES
    });
    console.log(existingNotes);

    // add new notes to the cache
    const newNote = data.insert_notes.returning[0];
    console.log(newNote);
    cache.writeQuery({
      query: GET_MY_NOTES,
      data: { notes: [newNote, ...existingNotes.notes] }
    });
  };

  const reset = () => {
    setTitle("");
    setDescripton("");
  };

  const [addNote] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: reset
  });

  return (
    <form
      className="formInput"
      onSubmit={e => {
        e.preventDefault();

        addNote({ variables: { des: description, title, isPublic } });
      }}
    >
      <input
        className="title"
        placeholder="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="description"
        className="description"
        value={description}
        onChange={e => setDescripton(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NoteInput;

const Note = ({ note, toggleImportance }) => {
  return (
    <li className="note">
      {note.content}({note.important.toString()})
      <button onClick={toggleImportance}>Change important</button>
    </li>
  );
};

export default Note;

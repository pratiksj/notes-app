const Note = ({ note, toggleImportance }) => {
  const label = !note.important ? "make important" : "make not important";
  return (
    <li className="note">
      {/* {note.content}({note.important.toString()}) */}
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;

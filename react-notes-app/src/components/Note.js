const Note=({note,toggleImportance})=>{

    return(
        <li>{note.content}({note.important.toString()})<button onClick={toggleImportance}>Change important</button></li>
    )

}

export default Note
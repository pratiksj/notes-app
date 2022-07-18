import {useState} from "react"
import Note from "./components/Note";

const App=(props)=> {
  const [note,setNote]=useState(props.notes)
  const [newnote,setnewNote]=useState("pratiksha")
  
  const addNote=(event)=>{
    event.preventDefault()
const newObjects ={
  content:newnote,
  date: new Date().toISOString(),
  important:Math.random()<0.5,
  id:props.notes.length+1
}
setNote(note.concat(newObjects))
setnewNote("") //note add vayepachi input field laii khali banauna
}
  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setnewNote(event.target.value)
  }
  return (
    <div>
      <h1>Hellow there</h1>
      <ul>
      {props.notes.map((x) => (
          <Note key={x.id} note={x} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value ={newnote} onChange={handleNoteChange}/>
        <button>click me</button>
      </form>
      
    </div>
  );
}

export default App;

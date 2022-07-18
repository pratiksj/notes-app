import {useState} from "react"
import Note from "./components/Note";

const App=(props)=> {
  const [note,setNote]=useState(props.notes)
  const [newnote,setnewNote]=useState("pratiksha")
  
  const addNote=(event)=>{
    event.preventDefault()
  console.log(event.target)

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

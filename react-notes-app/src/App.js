import {useState} from "react"
import Note from "./components/Note";

const App=(props)=> {
  const [note,setNote]=useState(props.notes)
  const [newnote,setnewNote]=useState("pratiksha")
  const[showAll,setShowAll]=useState(true)
  
const addNote=(event)=>{
    event.preventDefault()
const newObjects ={
  content:newnote,
  date: new Date().toISOString(),
  important:Math.random()<0.5,
  id:note.length+1
}
setNote(note.concat(newObjects))
setnewNote("") //note add vayepachi input field laii khali banauna
}
  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setnewNote(event.target.value)
  }
const toggleShowAll=()=>{
  setShowAll(!showAll)
}
//const filterFunction=(y)=> y.important ===true
//const filteredItems = props.notes.filter(filterFunction)
const notesToShow = showAll?note:note.filter(note=>note.important===true) //ternary

  return (
    <div>
      <h1>Hellow there</h1>
      <button onClick={toggleShowAll}>Show {showAll?"important":"all"}

      </button>
      <ul>
      {notesToShow.map((x) => (
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

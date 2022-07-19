import {useState, useEffect} from "react"
import Note from "./components/Note";
import axios from 'axios'

const App=()=> {
  const [note,setNote]=useState([])
  const [newnote,setnewNote]=useState("pratiksha")
  const[showAll,setShowAll]=useState(true)

  useEffect(() =>{axios.get('http://localhost:3001/notes').then(response =>{
  setNote(response.data)
console.log('i am using useeffect')})


  },[showAll])
  // axios.get('http://localhost:3001/notes').then(response =>{
  //   setNote(response.data)
  //   console.log(response.data)}) use effect na halera garyo vane then function ma vako console.log call vako vaye garxa
  
const addNote=(event)=>{
    event.preventDefault()
const newObjects ={
  content:newnote,
  date: new Date().toISOString(),
  important:Math.random()<0.5, //math.radom le 0 dekhi less tha 1 ko bich ko random number dinxa 
  id:note.length+1
}
setNote(note.concat(newObjects)) //naya object banaune
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

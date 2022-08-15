import {useState, useEffect} from "react"
import Note from "./components/Note";
//import axios from 'axios'
import noteService from "./services/note"

const App=()=> {
  const [note,setNote]=useState([])
  const [newnote,setnewNote]=useState("pratiksha")
  const[showAll,setShowAll]=useState(true)

  useEffect(() =>{
    //axios.get('http://localhost:3001/notes')
  noteService.getAll().then(data =>{
  setNote(data)})


  },[showAll])
  // axios.get('http://localhost:3001/notes').then(response =>{
  //   setNote(response.data)
  //   console.log(response.data)}) use effect na halera garyo vane then function ma vako console.log call vako vaye garxa
  
const addNote=(event)=>{
    event.preventDefault()
const newObject ={ 
  content:newnote,
  date: new Date().toISOString(),
  important:Math.random()<0.5, //math.radom le 0 dekhi less tha 1 ko bich ko random number dinxa 
  //id:note.length+1 post use garepachi backend le afaile id create garxa hamle halnu parne
}
//axios.post('http://localhost:3001/notes',newObjects) //request matra gareko
noteService.create(newObject).then((result)=>{
  //console.log(response)
  setNote(note.concat(result)) //naya object banaune jun naya note banauxa response telai naii farkauxa
setnewNote("")
  
})
 //note add vayepachi input field laii khali banauna
}
  const handleNoteChange=(event)=>{
//console.log(event.target.value)
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
          <Note key={x.id} note={x} toggleImportance=  {()=>{
            //console.log(`I am clicked from the function ${x.id}`)
            //1.make new object from current note with toggle important field
            const updateNote ={...x, important:!x.important}
            //2.update backend server with updated object
            //axios.put(`http://localhost:3001/notes/${x.id}`, updateNote)
            noteService.update(x.id,updateNote).then((data)=>{
            //3.now, alos updated the frontend object
              setNote(note.map((y)=>(y.id!==x.id ? y:data))) //naya object banaune jun naya note banauxa response telai naii farkauxa
            setnewNote("") }).catch((error)=>{
             console.log('caught the error')
             setNote(note.filter((x)=>x.id!==note.id)) 
            })
        }
      }
     />
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

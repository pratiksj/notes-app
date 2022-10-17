import {useState, useEffect} from "react"
import Note from "./components/Note";
//import axios from 'axios'
import Footer from "./components/Footer"
import noteService from "./services/note"
import Notification from "./components/Notification";
import loginService from './services/login'

const App=()=> {
  const [note,setNote]=useState([])
  const [newnote,setnewNote]=useState("pratiksha")
  const[showAll,setShowAll]=useState(true)
  const [message, setErrorMessage]= useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  //const[message, setMessage]=useState(null)

  useEffect(() =>{
    //axios.get('http://localhost:3001/notes')
  noteService.getAll().then(data =>{
  setNote(data)})


  },[])
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
  
}).catch(error=>{
  console.log('this is error')
  console.dir(error)
  setErrorMessage(error.response.data.error)
  setTimeout(() => {
    setErrorMessage("");
  }, 2000)
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

const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

  return (
    <div>
      <h1>Heroku Notes</h1>
      {/* <Notification message="this is a message" /> */}
      <Notification message={message}/>

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

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
             setErrorMessage("Note does not exisit anymore")
             setTimeout(() => setErrorMessage(null), 2000);
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
      <Footer/>
      
    </div>
  );
}

export default App;

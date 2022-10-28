import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
//import axios from 'axios'
import Footer from "./components/Footer";
import noteService from "./services/note";
import Notification from "./components/Notification";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

const App = () => {
  const noteFormRef = useRef();
  const [note, setNote] = useState([]);
  // const [newnote, setnewNote] = useState("Add a new note");
  const [showAll, setShowAll] = useState(true);
  const [message, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //const[message, setMessage]=useState(null)

  useEffect(() => {
    //axios.get('http://localhost:3001/notes')
    noteService.getAll().then((data) => {
      setNote(data);
    });
  }, []);
  // axios.get('http://localhost:3001/notes').then(response =>{
  //   setNote(response.data)
  //   console.log(response.data)}) use effect na halera garyo vane then function ma vako console.log call vako vaye garxa
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNote(note.concat(returnedNote));
      noteFormRef.current.toggleVisibility();
    });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  //const filterFunction=(y)=> y.important ===true
  //const filteredItems = props.notes.filter(filterFunction)
  const notesToShow = showAll
    ? note
    : note.filter((note) => note.important === true); //ternary

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      noteService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="Show me login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );
  return (
    <div>
      <h1>Heroku Notes</h1>
      {/* <Notification message="this is a message" /> */}
      <Notification message={message} />
      {/* {user === null ?
      loginForm() :
      noteForm()
    } */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
      <button onClick={toggleShowAll}>
        Show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((x) => (
          <Note
            key={x.id}
            note={x}
            toggleImportance={() => {
              //console.log(`I am clicked from the function ${x.id}`)
              //1.make new object from current note with toggle important field
              const updateNote = { ...x, important: !x.important };
              //2.update backend server with updated object
              //axios.put(`http://localhost:3001/notes/${x.id}`, updateNote)
              noteService
                .update(x.id, updateNote)
                .then((data) => {
                  //3.now, alos updated the frontend object
                  setNote(note.map((y) => (y.id !== x.id ? y : data))); //naya object banaune jun naya note banauxa response telai naii farkauxa
                })
                .catch((error) => {
                  console.log("caught the error");
                  setErrorMessage("Note does not exisit anymore");
                  setTimeout(() => setErrorMessage(null), 2000);
                  setNote(note.filter((x) => x.id !== note.id));
                });
            }}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;

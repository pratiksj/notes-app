import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios'
// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];
axios.get('http://localhost:3001/notes').then((response)=>{
console.log(response)
ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={response.data}/>)
}).catch((res)=>{
  console.log("hey there",res)
})




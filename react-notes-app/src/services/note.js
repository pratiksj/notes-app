import axios from 'axios'
//const baseUrl = 'http://localhost:3001/notes' ab url yesari na rakhda ni hunxa
const baseUrl = '/api/notes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response)=>{return response.data})
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }
    const request = axios.post(baseUrl, newObject,config)
  return request.then((response)=>{return response.data})
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response)=>{return response.data})
}

export default {   //key rah value eutao vaeyeko le talal jasari lekheko
  getAll, 
  create, 
  update, 
  setToken,
};
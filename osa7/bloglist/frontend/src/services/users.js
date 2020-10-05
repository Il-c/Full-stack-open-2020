import axios from 'axios'
const baseUrl = '/api/users'

/*const login = async credentials => {
  //console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}*/
const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getUsers }
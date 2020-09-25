import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const post = async (content) => {
  const object = {
    content,
    id:'',
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response
}
const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object )
  return response
}
export default { getAll, post, update }
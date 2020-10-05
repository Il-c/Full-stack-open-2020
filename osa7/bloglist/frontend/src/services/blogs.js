import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then (response => response.data)
}
const updateBlog = updatedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return request.then (response => response.data)
}
const commentBlog = (commentedBlog, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('lähtevä kommentti',comment)
  const request = axios.post(`${baseUrl}/${commentedBlog.id}/comments`, comment, config)
  return request.then (response => response.data)
}

const deleteBlog = blogObject => {
  console.log('blogiongeg',blogObject.id)
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blogObject.id}`, config)
  
  return request.then (response => response.data)
}

export default { getAll, postBlog, setToken, updateBlog, deleteBlog, commentBlog }
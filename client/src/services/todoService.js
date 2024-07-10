import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/todos'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token  // set the Authorization header
}

// get all todos
const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching todos:', error)
      throw error
    }
}

// get a specific todo
const getTodo = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching todo with id ${id}:`, error)
      throw error
    }
}

// create a new todo
const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject)
      return response.data
    } catch (error) {
      console.error('Error creating todo:', error)
      throw error
    }
}

// update a blog
const update = async (id, todoObject) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, todoObject)
      return response.data
    } catch (error) {
      console.error(`Error updating todo with id ${id}:`, error)
      throw error
    }
}

// remove a blog
const remove = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`)
      return id  // return the id of the removed todo
    } catch (error) {
      console.error(`Error removing todo with id ${id}:`, error)
      throw error
    }
}

export default {
    getAll,
    getTodo,
    create,
    update,
    remove,
    setToken,
    token,
}
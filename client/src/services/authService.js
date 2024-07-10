import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/register`, userData)
  return response.data
}

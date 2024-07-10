import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login, register } from '../services/authService'
import { message } from 'antd'

// login hook
export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: async (data) => {
      console.log(data)
      message.success('Login successful')
      localStorage.setItem('auth', JSON.stringify({ token: data.token, name: data.name }))
      navigate('/todos', { replace: true }) // redirect the protected route
    },
    onError: (error) => {
      console.error('Login error:', error)
      message.error('Login failed!')
    },
  })
}

// register hook
export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (userData) => register(userData),
    onSuccess: (data) => {
      message.success('Login successful')
      localStorage.setItem('token', data.token)
      navigate('/todos', { replace: true })
    },
    onError: (error) => {
      console.error('Login error:', error)
      message.error('User registration failed!')
    },
  })
}

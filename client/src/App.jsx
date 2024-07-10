import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Footer from "./components/common/Footer"
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import PrivateRoute from './utils/privateRoute' // component that only allows authenticated users to access the HomePage
import todoService from './services/todoService'
import { useEffect } from 'react'

const App = () => {
  // Set the token from localStorage if it exists
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth && auth.token) {
      todoService.setToken(auth.token)  // Ensure the token is set for API requests
    }
  }, [])
  console.log('TOKEN:',todoService.token)

  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/register' element={<RegisterForm />}/>
        <Route
          path='/todos'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('auth')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children  // render the children if authenticated
}

export default PrivateRoute

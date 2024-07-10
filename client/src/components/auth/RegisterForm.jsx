import { useState } from 'react'
import { useRegister } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: register } = useRegister()

  const handleSubmit = (e) => {
    e.preventDefault()
    register({ email, name, password })
  }

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-slate-100 rounded-lg shadow-xl">
      <h2 className="text-2xl text-slate-500 font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-400 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-600"
        >
          Register
        </button>
        <p className='py-3 text-slate-500'>
          Already have an account? <Link to="/login" style={{'color': '#3366ff'}}>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterForm

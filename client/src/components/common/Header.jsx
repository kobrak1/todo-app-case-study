import { useNavigate } from "react-router-dom";

const Header = () => {
    const { name } = JSON.parse(localStorage.getItem('auth')) || {}
    const navigate = useNavigate()

    const handleLogout = () => {
      localStorage.removeItem('auth')
      navigate('/login')
    }

  return (
    <header className="bg-slate-400 p-4 mb-4">
      <div className="container mx-auto flex items-center justify-around">
        <h1 className="text-white text-2xl font-bold">Todo App</h1>
        <div className="flex">
          <p className="mr-6 mt-2 text-white text-lg"> ✨{name} </p>
          <div className="border rounded-md border-slate-200 px-4 py-1 hover:border-white group">
            <button onClick={handleLogout} className="text-slate-200 group-hover:text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header
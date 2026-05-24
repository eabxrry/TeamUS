import { UserStar } from "lucide-react"
import { useNavigate } from "react-router-dom"
function Header() {
  const navigate = useNavigate()
  return (
    
    <header className="container mx-auto lg:px-7.5 flex items-center justify-between py-3 px-4 rounded-full mt-4 bg-blue-100 border border-primary/20">
        <h1 onClick={() => navigate('/')} className=" cursor-pointer font-bold text-xl ">Team<span className="text-primary">US</span> </h1>
        <nav>
            <button onClick={() => navigate('/admin')} className=" font-medium border border-primary/50 py-2 px-4 rounded-2xl hover:bg-primary-dark cursor-pointer bg-primary text-white flex items-center gap-2"><UserStar size={20} /> ADMIN</button>
        </nav>
    </header>
  )
}

export default Header
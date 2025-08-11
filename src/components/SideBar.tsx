import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="flex flex-col absolute left-0 top-0 bg-amber-300 w-16 h-[calc(100vh-4rem)] mt-16">
        <Link to="/favorites"><button>Favorites</button></Link>
    </div>
  )
}

export default SideBar

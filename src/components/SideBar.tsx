import { Link } from "react-router-dom"
import { FaHeart, FaSearch } from "react-icons/fa"

const SideBar = () => {
  return (
    <div className="flex flex-col gap-5 items-center absolute left-0 top-0 bg-background w-16 h-[calc(100vh-4rem)] mt-16 p-5">
        <Link to="/favorites"><FaHeart className="text-white text-2xl transition hover:text-green-600" /></Link>
        <Link to="/search"><FaSearch className="text-white text-2xl transition hover:text-green-600" /></Link>
    </div>
  )
}

export default SideBar

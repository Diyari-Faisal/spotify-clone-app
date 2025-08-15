import { Link } from "react-router-dom"
import { FaHeart, FaHome, FaSearch } from "react-icons/fa"

const SideBar = () => {
  return (
    <div className="flex flex-col gap-10 items-center absolute left-0 top-0 bg-background w-16 h-[calc(100vh-4rem)] mt-16 p-5">
      <Link to="/"><FaHome className="text-white text-2xl transition hover:-translate-y-1 hover:text-green-600" /></Link>
        <Link to="/favorites"><FaHeart className="text-white text-2xl transition hover:-translate-y-1 hover:text-green-600" /></Link>
        <Link to="/search"><FaSearch className="text-white text-2xl transition hover:-translate-y-1 hover:text-green-600" /></Link>
    </div>
  )
}

export default SideBar

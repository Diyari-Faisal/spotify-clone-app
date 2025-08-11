import { Link } from 'react-router-dom';
import reactSvg from '../assets/react.svg';

const Navbar = () => {
  return (
    <div className="flex justify-between absolute top-0 items-center px-4 bg-amber-900 h-16 w-screen">
        
        <Link to="/"><img src={reactSvg} className='animate-[spin_4s_linear_infinite]' /></Link>

            <input type="text" placeholder="What do you want to play?" className="w-xs bg-blue-300" />

        <p>Spotify</p>

    </div>
  )
}

export default Navbar

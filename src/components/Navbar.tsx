import { Link, useNavigate } from 'react-router-dom';
import reactSvg from '../assets/react.svg';
import { useSearchSong } from '../store/useSearchSong';
import { useRef } from 'react';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
	const setQuery = useSearchSong(state => state.setQuery);
  const setFetched = useSearchSong(state => state.setFetched);
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryRef.current?.value) {
      setQuery(queryRef.current.value);
      setFetched(false);
      navigate("/search");
    }
  };

  return (
    <div className="flex justify-between absolute top-0 items-center px-4 bg-background h-16 w-screen">
        
        <Link to="/"><img src={reactSvg} className='animate-[spin_4s_linear_infinite]' /></Link>
        
        <div className="relative w-full max-w-xs mx-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={queryRef}
              placeholder="What do you want to play?"
              className="w-full bg-blue-300 rounded-full p-2 pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </form>
        </div>

        <p className="text-white"></p>

    </div>
  )
}

export default Navbar

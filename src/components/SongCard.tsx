import { FaPlay, FaHeart } from "react-icons/fa"
import { useLikedSongs } from "../store/useLikedSongs"
import { useState } from "react"
import { useCurrentSong } from "../store/useCurrentSong"

interface props {
    songName: string,
    songPic: string,
    artistName: string,
    songUrl: string
}

const SongCard = ({ songName, songPic, artistName, songUrl }: props) => {
  const [like, setLike] = useState(false);
  const likeSong = useLikedSongs(state => state.likeSong);
  const unlikeSong = useLikedSongs(state => state.unlikeSong);
  const isLiked = useLikedSongs(state => state.isLiked);
  const liked = isLiked(songUrl);
  const setCurrentSong = useCurrentSong(state => state.getCurrentSong);

  const handleClick = () => {
    setLike(prevLike => !prevLike)
    liked
      ? unlikeSong(songUrl)
      : likeSong({ songName, songPic, artistName, songUrl });
  };

  const setSong = () => {
    setCurrentSong({ songName, songPic, artistName, songUrl });
  }

  return (
    <div onClick={setSong} className="flex flex-col h-full w-full bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-0 rounded-2xl overflow-hidden shadow-xl transform transition duration-300 hover:-translate-y-3 group hover:ring-4 hover:ring-indigo-300">
      <div className="relative flex justify-center items-center aspect-square overflow-hidden">
        <img
          src={songPic}
          alt={songName}
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Play"
        >
          <FaPlay className="text-white text-4xl bg-indigo-900 bg-opacity-70 rounded-full p-3 shadow-lg hover:bg-opacity-90 transition" />
        </button>
        <button
          className="absolute top-3 right-3 rounded-full p-2 shadow transition bg-react-grey bg-opacity-80"
          aria-label="Favorite"
          onClick={handleClick}
        >
          <FaHeart className={`text-xl transition-colors duration-300 ${liked ? "text-red-500" : "text-white"}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="font-extrabold text-lg text-white text-center truncate w-full">{songName}</h3>
        <p className="opacity-80 text-sm text-indigo-100 text-center mt-1 truncate w-full">{artistName}</p>
      </div>
    </div>
  )
}

export default SongCard

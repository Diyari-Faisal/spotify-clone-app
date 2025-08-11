import SongCard from "../components/SongCard";
import { useLikedSongs } from "../store/useLikedSongs"

interface song {
    songName: string,
    artistName: string,
    songPic: string,
    songUrl: string
}

const FavSongs = () => {
    const likedSongs: song[] = useLikedSongs(state => state.likedSongs);

    return (
        <div className="p-2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-400">❤ Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8">
                {likedSongs.map((element, index) => (
                    <SongCard key={index} songName={element.songName} songPic={element.songPic} artistName={element.artistName} songUrl={element.songUrl} />
                ))}
            </div>
        </div>
    )
}

export default FavSongs

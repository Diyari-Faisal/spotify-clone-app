import { useCurrentSong } from "../store/useCurrentSong"

interface musicPlayer {
    url: string,
    imageSrc: string,
    songName: string
    artistName: string,
}

const MusicPlayer = ({ imageSrc, songName, artistName }: musicPlayer) => {
  const currentSong = useCurrentSong(state => state.currentSongUrl);

  return (
    <div className="flex justify-between items-center absolute bottom-0 bg-amber-950 h-18 w-screen p-4 z-10">

      <div className="flex justify-between">
        <img src={imageSrc} className="h-13 w-13 mr-2" />
        <div className="flex flex-col">
            <p>{songName}</p>
            <p>{artistName}</p>
        </div>
      </div>

      <audio src={currentSong} controls autoPlay></audio>

      <div>
        <input type="range" min={0} max={1} step={0.02} className="range accent-red-500"/>
      </div>
    </div>
  )
}

export default MusicPlayer

import { useEffect, useRef, useState } from "react";
import SongCard from "../components/SongCard";
import type { Tracks, Artists } from "../store/searchTypes";
import { useSearchSong } from "../store/useSearchSong"
import ArtistCard from "../components/ArtistCard";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const query = useSearchSong(state => state.query);
	const searchedSong: Tracks = useSearchSong(state => state.searchedSong);
  const searchedArtist: Artists = useSearchSong(state => state.searchedArtist);
	  const getData: () => Promise<void> = useSearchSong(state => state.getSearchedSong);

  const errorMsg = useRef("");

  
	useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getData();
      } catch (error) {
        errorMsg.current = error.message;
        console.error(error)
      } finally {
        setLoading(false);
      }
    }
    
    if (query) {
      fetchData();
    }
	}, [query, getData])

  if (loading || errorMsg.current !== "") {
    return (
      <section className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400 mb-6"></div>
        <h2 className="text-xl font-semibold text-green-400">{errorMsg.current === "" ? `Loading ${query}...` : errorMsg.current}</h2>
      </section>
    );
  }

  if (query === "") {
    return (
      <section className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold text-green-400">Search For a Song</h2>
      </section>
    )
  }
  
  return (
    <section className="p-2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-400">Searching For: {query}</h1>
      <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8">
            {searchedSong.hits && searchedSong.hits.map((element, index) => (
              <SongCard key={index} songName={element.track.title} artistName={element.track.subtitle} songPic={element.track.images.coverart} songUrl={element.track.hub.actions[1].uri!} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8 mt-5">
            {searchedArtist.hits && searchedArtist.hits.map((element, index) => (
              <ArtistCard key={index} artistName={element.artist.name} artistPic={element.artist.avatar} />
            ))}
          </div>
      </div>
    </section>
  )
}

export default SearchPage
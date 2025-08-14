import { useEffect, useRef, useState } from "react";
import SongCard from "../components/SongCard";
import type { Tracks, Artists } from "../store/searchTypes";
import { useSearchSong } from "../store/useSearchSong"
import ArtistCard from "../components/ArtistCard";


const SearchPage = () => {
  const [loading, setLoading] = useState(false)
  const query = useSearchSong(state => state.query)
	const searchedSong: Tracks = useSearchSong(state => state.searchedSong);
  const searchedArtist: Artists = useSearchSong(state => state.searchedArtist);
	const getData = useSearchSong(state => state.getSearchedSong);
  const setFetched = useSearchSong(state => state.setFetched);

  const errorMsg = useRef("");

	useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          setLoading(true);
          await getData();
        } catch (error) {
          errorMsg.current = error.message;
        } finally {
          setLoading(false);
        }
        setFetched(true);
      };
      fetchData();
    }
	}, [query])

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
        <h2 className="text-xl font-semibold text-green-400">Search For a Song...</h2>
      </section>
    )
  }
  if (searchedArtist && searchedSong) {
    return (
      <section className="p-2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-400">Searching For: {query}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8">

            {searchedSong && searchedSong.hits.map((element, index) => (
              <SongCard key={index} songName={element.track.title} artistName={element.track.subtitle} songPic={element.track.images.coverart} songUrl={element.track.hub.actions[1].uri!} />
            ))}

            {searchedArtist && searchedArtist.hits.map((element, index) => (
              <ArtistCard key={index} artistName={element.artist.name} artistPic={element.artist.avatar} />
            ))}
        </div>
      </section>
    )
  }
}

export default SearchPage

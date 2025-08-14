import { useEffect, useRef, useState } from "react"
import type { RootObject } from "../store/types"
import { useFetchWorldChartStore } from "../store/useFetchWorldChartStore"
import SongCard from "./SongCard"

const WorldChart = () => {
  const [loading, setLoading] = useState(true);
  const data: RootObject[] = useFetchWorldChartStore((state) => state.worldChart) || []
  const getData: () => Promise<void> = useFetchWorldChartStore((state) => state.getData);

  const errorMsg = useRef("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await getData();
        } catch (error: any) {
          errorMsg.current = error.message;
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  
    if (loading || errorMsg.current !== "") {
      return (
        <section className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400 mb-6"></div>
          <h2 className="text-xl font-semibold text-green-400">{errorMsg.current ? errorMsg.current : `Loading World Chart...`}</h2>
        </section>
      );
    }

  return (
    <section className="p-2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-400">🌍 World Chart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-8">
        {data.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">No songs available.</div>
        ) : (
          data.map((element: RootObject, index: number) => (
            <SongCard
              key={index}
              songName={element.attributes?.name || "Unknown"}
              songPic={
                element.attributes?.artwork?.url
                  ? element.attributes.artwork.url.replace("{w}", "440").replace("{h}", "440")
                  : "https://via.placeholder.com/440"
              }
              artistName={element.attributes?.artistName || "Unknown"}
              songUrl={
                element.attributes?.previews && element.attributes.previews.length > 0
                  ? element.attributes.previews[0].url
                  : ""
              }
            />
          ))
        )}
      </div>
    </section>
  )
}

export default WorldChart

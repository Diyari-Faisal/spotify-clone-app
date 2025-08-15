import { FaPlay, FaPause } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { useCurrentSong } from "../store/useCurrentSong"
import { useRef, useState, useEffect, useCallback } from "react";
import { useFetchWorldChartStore } from "../store/useFetchWorldChartStore";
import type { RootObject } from "../store/types";

const MusicPlayer = () => {
  const currentSong = useCurrentSong(state => state.currentSong);
  const playing = useCurrentSong(state => state.playing);
  const setPlaying = useCurrentSong(state => state.setPlaying);
  const worldChart: RootObject[] = useFetchWorldChartStore(state => state.worldChart);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSkip = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * worldChart.length);
    currentSong.songUrl = worldChart[randomIndex].attributes.previews[0].url;
    currentSong.artistName = worldChart[randomIndex].attributes.artistName;
    currentSong.songName = worldChart[randomIndex].attributes.name;
    currentSong.songPic = worldChart[randomIndex].attributes.artwork.url;
  }, [worldChart, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => {
      setTimeout(() => {
        audioRef.current?.play();
        handleSkip();
      }, 100);
    });
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong.songUrl, handleSkip]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying();
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background p-2 sm:p-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 shadow-lg">
      <div className="flex items-center w-full sm:w-auto gap-2">
        <img
          src={currentSong.songPic}
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl object-cover"
          alt={currentSong.songName}
        />
        <div className="flex flex-col sm:w-32 truncate">
          <p className="font-semibold text-white text-sm sm:text-base truncate">{currentSong.songName}</p>
          <p className="text-xs sm:text-sm text-gray-300 truncate">{currentSong.artistName}</p>
        </div>
      </div>

      <div className="flex flex-col w-full sm:w-auto justify-center">
        <audio
          ref={audioRef}
          src={currentSong.songUrl}
          autoPlay
        ></audio>
        <div className="flex flex-row gap-8 justify-center items-center w-full">
          <FaBackwardStep onClick={handleSkip} className="text-white text-2xl transition hover:-translate-y-1 hover:text-green-600" />
          <button className="flex justify-center items-center bg-white size-10 rounded-full transition hover:-translate-y-1 hover:bg-green-600" onClick={handlePlay}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <FaForwardStep onClick={handleSkip} className="text-white text-2xl transition hover:-translate-y-1 hover:text-green-600" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-white">{Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60) > 9 ? Math.floor(Math.floor(currentTime) % 60) : "0" + Math.floor(Math.floor(currentTime) % 60)}</p>
          <input
            type="range"
            min={0}
            max={Math.floor(duration) || 0}
            value={currentTime}
            step={0.01}
            onChange={handleTimeChange}
            className="accent-white h-2 w-md rounded-full hover:accent-green-600"
          />
          <p className="text-white">{Math.floor(duration / 60)}:{(Math.floor(duration) % 60) > 9 ? Math.floor(Math.floor(duration) % 60) : "0" + Math.floor(Math.floor(duration) % 60)}</p>
        </div>
      </div>

      <div className="w-full sm:w-auto flex justify-end">
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          className="w-full sm:w-32 accent-green-600 no-thumb"
          onChange={handleVolume}
        />
      </div>
    </div>
  )
}

export default MusicPlayer

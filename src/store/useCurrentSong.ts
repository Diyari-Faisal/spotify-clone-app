import { create } from "zustand";

interface songProps {
    songName: string,
    artistName: string,
    songPic: string,
    songUrl: string
}

interface currentSongStore {
    currentSong: { 
        songName: string,
        artistName: string,
        songPic: string,
        songUrl: string
    },
    playing: boolean,
    setPlaying: () => void,
    getCurrentSong: (songData: songProps) => void,
    nextSong: () => void,
    prevSong: () => void
}

export const useCurrentSong = create<currentSongStore>((set) => ({
    currentSong: {
        songName: "",
        artistName: "",
        songPic: "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770260590-G0RAKA339WW6KD91L6M5/album-placeholder.png?format=500w",
        songUrl: ""
    },
    playing: true,
    setPlaying: () => {
        set((state) => ({playing: !state.playing}))
    },
    getCurrentSong: ({songName, artistName, songPic, songUrl} : songProps) => {
        set(() => ({ currentSong: {
            songName,
            artistName,
            songPic,
            songUrl
        } }));
    },
    nextSong: () => {

    },
    prevSong: () => {
        
    }
}))
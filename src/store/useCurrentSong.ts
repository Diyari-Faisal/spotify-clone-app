import { create } from "zustand";

interface currentSongStore {
    currentSongUrl: string,
    getCurrentSong: (songUrl: string) => void
}

export const useCurrentSong = create<currentSongStore>((set) => ({
    currentSongUrl: "",
    getCurrentSong: (songUrl) => {
        set(() => ({ currentSongUrl: songUrl }));
    }
}))
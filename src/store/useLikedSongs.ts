import { create } from "zustand";

interface song {
    songName: string,
    artistName: string,
    songPic: string,
    songUrl: string
}

interface LikedSongsStore {
  likedSongs: song[];
  likeSong: (song: song) => void;
  unlikeSong: (songUrl: string) => void;
  isLiked: (songUrl: string) => boolean;
}

export const useLikedSongs = create<LikedSongsStore>((set, get) => ({
  likedSongs: [],
  likeSong: (song) =>
    set((state) => ({
      likedSongs: state.likedSongs.some(s => s.songUrl === song.songUrl)
        ? state.likedSongs
        : [song, ...state.likedSongs],
    })),
  unlikeSong: (songUrl) =>
    set((state) => ({
      likedSongs: state.likedSongs.filter(s => s.songUrl !== songUrl),
    })),
  isLiked: (songUrl) =>
    get().likedSongs.some(s => s.songUrl === songUrl),
}));
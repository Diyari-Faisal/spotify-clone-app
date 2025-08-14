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

// Helper to load from localStorage
const loadLikedSongs = (): song[] => {
  try {
    const data = localStorage.getItem("likedSongs");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useLikedSongs = create<LikedSongsStore>((set, get) => ({
  likedSongs: loadLikedSongs(),
  likeSong: (song) =>
    set((state) => {
      const alreadyLiked = state.likedSongs.some(s => s.songUrl === song.songUrl);
      const updated = alreadyLiked ? state.likedSongs : [song, ...state.likedSongs];
      localStorage.setItem("likedSongs", JSON.stringify(updated));
      return { likedSongs: updated };
    }),
  unlikeSong: (songUrl) =>
    set((state) => {
      const updated = state.likedSongs.filter(s => s.songUrl !== songUrl);
      localStorage.setItem("likedSongs", JSON.stringify(updated));
      return { likedSongs: updated };
    }),
  isLiked: (songUrl) =>
    get().likedSongs.some(s => s.songUrl === songUrl),
}));
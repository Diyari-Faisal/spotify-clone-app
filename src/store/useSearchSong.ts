import axios from "axios";
import { create } from "zustand";
import type { Artists, Tracks } from "./searchTypes";

interface searchSongStore {
    searchedSong: Tracks,
    searchedArtist: Artists,
    query: string,
    setQuery: (search: string) => void,
    fetched: boolean,
    setFetched: (fetch: boolean) => void,
    getSearchedSong: () => Promise<void>
}

export const useSearchSong = create<searchSongStore>((set, get) => ({
    searchedSong: {} as Tracks,
    searchedArtist: {} as Artists,
    query: "",
    setQuery: (search) => {
        set(() => ({query: search}))
    },
    fetched: false,
    setFetched: (fetch) => {
        set(() => ({fetched: fetch}))
    },
    getSearchedSong: async () => {
        if (get().fetched) return;
        const query = get().query;
        const response = await axios.get(
            `https://shazam-core.p.rapidapi.com/v1/search/multi?offset=0&search_type=SONGS_ARTISTS&query=${query}`,
            {
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
                    "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST
                }
            }
        );
        set(() => ({
            searchedSong: response.data.tracks,
            searchedArtist: response.data.artists
        }))
    }
}))
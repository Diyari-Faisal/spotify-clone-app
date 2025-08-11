import axios from "axios"
import { create } from "zustand"
import type { RootObject } from "./types";

interface FetchStore {
    worldChart: RootObject[],
    fetched: boolean,
    getData: () => Promise<void>
}

export const useFetchWorldChartStore = create<FetchStore>((set, get) => ({
    worldChart: [],
    fetched: false,
    getData: async () => {
        if (get().fetched) return; // Prevent refetch
        const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ", {
            headers: {
                "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
                "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST
            }
        });
        set(() => ({ worldChart: response.data, fetched: true }))
    }
}))
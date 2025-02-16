import create from "zustand";
import { fetchPlantList } from "../api/plantApi";

interface PlantState {
  plants: Plant[];
  fetchPlants: () => void;
}

export const usePlantStore = create<PlantState>((set) => ({
  plants: [],
  fetchPlants: async () => {
    const data = await fetchPlantList();
    set({ plants: data });
  },
}));

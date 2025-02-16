export const fetchPlants = async () => {
    return fetch("/api/plants").then((res) => res.json());
  };
  
  export const fetchPlantDetails = async (plantId: number) => {
    return fetch(`/api/plants/${plantId}`).then((res) => res.json());
  };
  
  export const createPlantSession = async (speciesId: number, method: string) => {
    return fetch("/api/plants/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ species_id: speciesId, method }),
    }).then((res) => res.json());
  };
  
  export const controlPlant = async (plantId: number, command: string) => {
    return fetch(`/api/plants/${plantId}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    }).then((res) => res.json());
  };
  
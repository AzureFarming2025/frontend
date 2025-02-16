export const fetchPlantStatus = async () => {
    return fetch("/api/status").then((res) => res.json());
  };
  
  export const fetchPlantHistory = async (plantId: number) => {
    return fetch(`/api/history/plant/${plantId}`).then((res) => res.json());
  };
  
  export const fetchUserHistory = async () => {
    return fetch("/api/history/user").then((res) => res.json());
  };
  
  export const fetchAlerts = async () => {
    return fetch("/api/alerts").then((res) => res.json());
  };
  
  export const dismissAlert = async (alertId: number) => {
    return fetch("/api/alerts/dismiss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alert_id: alertId }),
    }).then((res) => res.json());
  };
  
  export const fetchRecommendations = async (plantId?: number) => {
    const url = plantId ? `/api/recommendations/${plantId}` : "/api/recommendations";
    return fetch(url).then((res) => res.json());
  };
  
export const fetchAutomationSettings = async () => {
    return fetch("/api/automation/settings").then((res) => res.json());
  };
  
  export const toggleAutomation = async (status: boolean) => {
    return fetch("/api/automation/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: status }),
    }).then((res) => res.json());
  };
  
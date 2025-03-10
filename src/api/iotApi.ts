export const sendDeviceData = async (deviceId: number, data: any) => {
    return fetch(`/api/device/${deviceId}/data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };
  
export const sendDeviceCommand = async (deviceId: number, command: string) => {
    return fetch(`/api/device/${deviceId}/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    }).then((res) => res.json());
  };
  
  export const fetchDeviceStatus = async () => {
    return fetch("/api/device/status").then((res) => res.json());
  };
  
  export const fetchDeviceHistory = async () => {
    return fetch("/api/device/history").then((res) => res.json());
  };
  
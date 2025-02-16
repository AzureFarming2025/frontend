export const registerUser = async (email: string, password: string) => {
    return fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  };
  
  export const loginUser = async (email: string, password: string) => {
    return fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  };
  
  export const fetchUserProfile = async () => {
    return fetch("/api/profile").then((res) => res.json());
  };
  
  export const updateUserProfile = async (data: any) => {
    return fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };
  
  export const fetchUserActivity = async () => {
    return fetch("/api/activity").then((res) => res.json());
  };
  
  export const fetchUserDashboard = async () => {
    return fetch("/api/dashboard").then((res) => res.json());
  };
  
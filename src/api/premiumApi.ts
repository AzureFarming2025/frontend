export const fetchPremiumStatus = async () => {
    return fetch("/api/premium/status").then((res) => res.json());
  };
  
  export const subscribePremium = async () => {
    return fetch("/api/premium/subscribe", {
      method: "POST",
    }).then((res) => res.json());
  };
  
  export const cancelPremium = async () => {
    return fetch("/api/premium/cancel", {
      method: "POST",
    }).then((res) => res.json());
  };
  
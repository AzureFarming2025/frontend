// User Management
export async function fetchProfile() {
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    theme: "light",
    notifications: true,
    emailNotifications: "all",
    avatar: "https://via.placeholder.com/150",
    lastLogin: "2023-10-01 12:34:56",
    twoFactorEnabled: true,
    reminder: "all",
  };
}

export async function updateProfile(data) {
  console.log("Profile updated with:", data);
  return { success: true };
}

export async function fetchMembership() {
  return {
    status: "Premium",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  };
}

export async function upgradeMembership() {
  console.log("Membership upgraded to Premium.");
  return { success: true };
}

export async function fetchPoints() {
  return {
    current: 1200,
    todayReward: "50P",
  };
}

export async function redeemPoints(amount) {
  console.log(`Redeemed ${amount} points.`);
  return { success: true };
}

export async function fetchPointsHistory() {
  return [
    { date: "2023-10-01", points: 50, action: "Daily Reward" },
    { date: "2023-09-30", points: 100, action: "Purchase Reward" },
    { date: "2023-09-29", points: -200, action: "Redeemed for Discount" },
  ];
}

export async function fetchPointsSummary() {
  return {
    totalPoints: 5000,
    redeemedPoints: 2000,
    availablePoints: 3000,
  };
}

// Guide & Admin Panel
export async function fetchPlants() {
  return [
    { id: 1, name: "Tomato", growthCycle: "90 days", careInstructions: "Water daily" },
    { id: 2, name: "Basil", growthCycle: "30 days", careInstructions: "Partial sunlight" },
  ];
}

export async function fetchPlantDetails(id) {
  return {
    id,
    name: "Tomato",
    growthCycle: "90 days",
    careInstructions: "Water daily, full sunlight",
  };
}

export async function addPlant(data) {
  console.log("New plant added:", data);
  return { success: true };
}

export async function updatePlant(id, data) {
  console.log(`Plant ${id} updated with:`, data);
  return { success: true };
}

export async function deletePlant(id) {
  console.log(`Plant ${id} deleted.`);
  return { success: true };
}

// Premium Features
export async function fetchPremiumStatus() {
  return { isPremium: true };
}

export async function toggleAutomation(enabled) {
  console.log(`Automation toggled to: ${enabled}`);
  return { success: true };
}

// Plants & IoT
export async function createPlantSession(data) {
  console.log("Plant session created with:", data);
  return { success: true, plantId: 101 };
}

export async function fetchUserPlants() {
  return [
    { id: 101, species: "Tomato", status: "Healthy", growthStage: "Vegetative" },
    { id: 102, species: "Basil", status: "Needs Water", growthStage: "Seedling" },
  ];
}

export async function fetchPlantState(id) {
  return {
    id,
    status: "Healthy",
    waterLevel: "Optimal",
    growthStage: "Vegetative",
  };
}

export async function controlPlant(id, command) {
  console.log(`Command "${command}" sent to plant ${id}.`);
  return { success: true };
}

export async function fetchPlantSensors(id) {
  return {
    id,
    temperature: 24.5,
    humidity: 65,
    soilMoisture: "Optimal",
  };
}

// Analytics & Alerts
export async function fetchPlantStatus() {
  return [
    { plantId: 101, statusFlag: "Needs Water", lastUpdated: "2023-10-01T10:00:00Z" },
    { plantId: 102, statusFlag: "Healthy", lastUpdated: "2023-10-01T09:30:00Z" },
  ];
}

export async function fetchPlantHistory(id) {
  return [
    { date: "2023-09-30", action: "Watered", details: "500ml of water added" },
    { date: "2023-09-29", action: "Fertilized", details: "10g of fertilizer applied" },
  ];
}

export async function fetchAlerts() {
  return [
    { id: 1, message: "Tomato plant needs water", severity: "High" },
    { id: 2, message: "Basil plant is in optimal condition", severity: "Low" },
  ];
}

export async function dismissAlert(id) {
  console.log(`Alert ${id} dismissed.`);
  return { success: true };
}

export async function fetchRecommendations(plantId) {
  return {
    suggestion: `Increase light exposure for plant ${plantId} by 2 hours daily.`,
  };
}

// IoT Gateway
export async function sendSensorData(deviceId, data) {
  console.log(`Sensor data sent for device ${deviceId}:`, data);
  return { success: true };
}

export async function sendIoTCommand(deviceId, command) {
  console.log(`Command "${command}" sent to device ${deviceId}.`);
  return { success: true };
}

export async function fetchDeviceStatus() {
  return [
    { deviceId: 1, status: "Online", lastUpdated: "2023-10-01T10:00:00Z" },
    { deviceId: 2, status: "Offline", lastUpdated: "2023-10-01T09:45:00Z" },
  ];
}

export async function fetchDeviceHistory(deviceId) {
  return [
    { date: "2023-09-30", action: "Watered", details: "500ml of water dispensed" },
    { date: "2023-09-29", action: "Fan On", details: "Fan turned on for 30 minutes" },
  ];
}

export async function deleteAccount() {
  console.log("Account deletion requested.");
  return { success: true };
}

export async function fetchLoginHistory() {
  return [
    { date: "2023-10-01", ip: "192.168.1.1", location: "New York, USA", device: "Chrome on Windows" },
    { date: "2023-09-30", ip: "192.168.1.2", location: "Los Angeles, USA", device: "Safari on macOS" },
    { date: "2023-09-29", ip: "192.168.1.3", location: "Chicago, USA", device: "Firefox on Linux" },
    { date: "2023-09-28", ip: "192.168.1.4", location: "Houston, USA", device: "Edge on Windows" },
    { date: "2023-09-27", ip: "192.168.1.5", location: "Seattle, USA", device: "Chrome on Android" },
  ];
}

export async function toggleTwoFactorAuth(enabled) {
  console.log(`Two-factor authentication toggled to: ${enabled}`);
  return { success: true, twoFactorEnabled: enabled };
}

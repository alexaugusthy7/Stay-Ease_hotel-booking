import axios from "axios";

export const BASE_URL =
  "https://stay-ease-hotel-booking.onrender.com";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default api;
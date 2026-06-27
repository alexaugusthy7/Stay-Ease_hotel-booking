import axios from "axios";

const api = axios.create({
  baseURL: "https://stay-ease-hotel-booking.onrender.com",
});

export default api;
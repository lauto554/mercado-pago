import axios from "axios";
import "dotenv/config";

const apiMercado = axios.create({
  baseURL: process.env.API_URL,
});

export default apiMercado;

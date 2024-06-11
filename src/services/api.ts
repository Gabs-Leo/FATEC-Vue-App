import axios, { AxiosInstance } from "axios";

export const api:AxiosInstance = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php"
})
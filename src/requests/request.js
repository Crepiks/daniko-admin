import axios from "axios";
import config from "@/config";

const request = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiUrl,
});

export default request;

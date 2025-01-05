import axios from "axios";
import { Token } from "../types";

const BASE_URL = "http://localhost:3000/tokens";

export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tokens:", error);
    return [];
  }
};
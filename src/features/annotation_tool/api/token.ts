import axiosInstance from '@/lib/axios.ts'
import { Token } from "../types";

const doc_edit_id = 1; //TODO get actual value
const BASE_URL = `/tokens/${doc_edit_id}`;

export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await axiosInstance.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tokens:", error);
    return [];
  }
};
import axios from "axios";
import { Schema } from "../types";

const BASE_URL = 'http://localhost:3000/schema'

export const fetchSchema = async (): Promise<Schema> => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Failed to fetch schema:', error)
    throw error
  }
}
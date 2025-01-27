import axiosInstance from "@/lib/axios";
import { Schema } from "../types";

export const fetchSchema = async (schemaId: string): Promise<Schema> => {
  const response = await axiosInstance.get(`/schema/${schemaId}`);
  return response.data.schema;
}
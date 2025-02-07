import axiosInstance from "@/lib/axios";
import { Schema } from "@/types/schema";

export const fetchSchema = async (schemaId: number): Promise<Schema> => {
  const response = await axiosInstance.get(`/schemas/${schemaId}`);
  return response.data;
}
import { Schema } from "@/features/schema/types/types";
import axiosInstance from "@/lib/axios";

export const fetchSchema = async (schemaId: string): Promise<Schema> => {
  const response = await axiosInstance.get(`/schema/${schemaId}`);
  return response.data.schema;
}
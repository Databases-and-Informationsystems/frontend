import axiosInstance from "@/lib/axios";
import { Token } from "../types";

export const fetchTokens = async (documentId: number): Promise<Token[]> => {
  const response = await axiosInstance.get(`/tokens/${documentId}`);
  return response.data.tokens;
};
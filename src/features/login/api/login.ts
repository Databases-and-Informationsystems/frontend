import axiosInstance from '@/lib/axios';

export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  await axiosInstance.post<void>('/auth/login', {
    email,
    password,
  });
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.post('/auth/signup', {
    username,
    email,
    password,
  });
  return response.data;
};

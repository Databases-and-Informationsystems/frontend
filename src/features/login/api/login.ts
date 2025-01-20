import axiosInstance from '@/lib/axios'

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const response = await axiosInstance.post('/auth/login', { email, password })
  return response.data
}

export const logoutUser = async () => {
  await axiosInstance.post('/auth/logout')
}

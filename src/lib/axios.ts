import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // (error) => {
  //   if (error.response.status === 401 || error.response.status === 403) {
  //     console.log('Here');
  //     localStorage.removeItem('token')
  //     window.location.href = '/login' // react router not accessible here
  //   }
  // }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('token')
      window.location.href = '/login' // react router not accessible here
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

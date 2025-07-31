import axios from 'axios'

const api = axios.create({
baseURL: 'https://eventify-g0fv.onrender.com/api',
  withCredentials: false,
})

// Automatically include token for every request
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const token = JSON.parse(userInfo).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api

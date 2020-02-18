import axios from 'axios'

const customAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

// const token = localStorage.getItem('token')

// customAxiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`

export default customAxiosInstance

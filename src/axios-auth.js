import axios from 'axios'

const customAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

export default customAxiosInstance

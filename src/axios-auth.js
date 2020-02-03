import axios from 'axios'

const customAxiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
})

export default customAxiosInstance

import axios from 'axios'

const customAxiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
})

const token = localStorage.getItem('token')

customAxiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`

export default customAxiosInstance

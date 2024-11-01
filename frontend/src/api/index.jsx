import axios from 'axios'

export const api_link = "http://localhost:8000/"

export default axios.create({
    baseURL: api_link,
    withCredentials: true,
})
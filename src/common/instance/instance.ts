import axios from "axios";

const token = '459d1d3c-5bee-41b8-a461-4583f1701a88'
const API_KEY = '60f832d0-b06e-4e32-a7fd-f271ef9cdfdd'

export const instanceAxios = axios.create(
    {
        baseURL: `https://social-network.samuraijs.com/api/1.1`,
        headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': API_KEY,
        }
    }
)
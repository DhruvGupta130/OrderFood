import axios from "axios"

export const API_URL=["http://192.168.29.187:8080", "http://localhost:8080"]

export const api=axios.create({
    baseURL:API_URL[0],
    headers:{
        "Content-Type":"application/json"
    }
})
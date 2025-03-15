import axios from "axios"
import {BACKEND_URL} from "../../CONFIG";

export const api=axios.create({
    baseURL:BACKEND_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

import axios from "./index"

export const postAddTask = (data) => {
    return axios.post("/task/", data)
}

export const getTasks = () => {
    return axios.get("/task/")
}
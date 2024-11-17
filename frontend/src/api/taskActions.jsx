import axios from "./index"

export const postAddTask = (data) => {
    return axios.post("/task", data)
}

export const getTasks = (filter_by, sort_by, sort_order) => {
    return axios.get(`/task?filter_by=${filter_by}&sort_by=${sort_by}&sort_order=${sort_order}`)
}

export const putUpdateTask = (data) => {
    return axios.put("/task", data)   
}

export const deleteTask = (task_id) => {
    return axios.delete(`/task?task_id=${task_id}`)
}

export const getCategories = () => {
    return axios.get("/task/category")
}
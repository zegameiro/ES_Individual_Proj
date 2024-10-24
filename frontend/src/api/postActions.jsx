import axios from "./index"

// Login 
export const postLogin = (data) => {
    return axios.post('user/login', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const postLogout = (access_token) => {
    return axios.post('user/logout?access_token=' + access_token)
}
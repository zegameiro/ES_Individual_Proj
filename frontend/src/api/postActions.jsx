// Login 
export const postLogin = (axios, data) => {
    return axios.post('login', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const postLogout = (axios, access_token) => {
    return axios.post('logout?access_token=' + access_token)
}
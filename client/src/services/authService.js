import * as request from './requester';
const baseUrl = "http://localhost:3030/users"

export const login = (loginData) => {
    return request.post(`${baseUrl}/login`, loginData);
};

export const register = (registerData) => {
    return request.post(`${baseUrl}/register`, registerData)
};

export const logout = () => request.get(`${baseUrl}/logout`)

// export const login = async (loginData) => {
//     const response = await fetch(`${baseUrl}/login`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(loginData)
//     });
//     const result = await response.json();
//     return result;
// }

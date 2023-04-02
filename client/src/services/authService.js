import * as request from './requester';
const baseUrl = "http://localhost:3030/users"

export const login = (loginData) => {
    return request.post(`${baseUrl}/login`, loginData);
};

export const register = (registerData) => {
    return request.post(`${baseUrl}/register`, registerData)
};

// export const logout = (token) => request.get( `${baseUrl}/logout`,token);
export const logout = async (token) => {
    const response = await fetch(`${baseUrl}/logout`,{
        headers: {
            'X-Authorization': token
        }
    });
    return response;
};



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

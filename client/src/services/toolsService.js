const baseUrl = "http://localhost:3030/data/tools"

export const getAll = async () => {
    const response = await fetch(`${baseUrl}`);
    // ?load=${relationQuery}
    let result = '';
    if(response.ok){

         result = await response.json();
    }
    // console.log(result)

    return result;
};

export const getOne = async (toolId) => {
//     const searchQuery = encodeURIComponent(`toolId="${toolId}"`);
//     const relationQuery = encodeURIComponent(`author=_ownerId:users`)
    const response = await fetch(`${baseUrl}/${toolId}`);
   
    const result = await response.json();
    // console.log(result);

    return result;
};

// export const getByOwner = async (token) => {
//     const relationQuery = encodeURIComponent('author=_ownerId:users')

//     const response = await fetch(`${baseUrl}?load=${relationQuery}`, {
//         headers: {
//             'X-Authorization': token
//         }
//     });
//     const result = await response.json();
//     console.log(result);


//     return result;
// }

// export const getByCategory = async (category) => {
//     const response= await fetch(`${baseUrl}/${category}`);
//     const result = await response.json();
//     console.log(result)
//     return result;
// }

export const create = async (toolData, token) => {
    const { ...data } = toolData;
    data.rented = '';
    // console.log(data);

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return result;
};

export const remove = async (toolId, token) => {
    const response = await fetch(`${baseUrl}/${toolId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    })
    return response;
};

export const update = async (toolData, toolId, token) => {
    const { ...data } = toolData;
    console.log(data)
    const response = await fetch(`${baseUrl}/${toolId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result)

    return result;
};
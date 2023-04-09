const baseUrl = "http://localhost:3030/data/rents";

export const addToMyRents = async (toolData, token) => {
    const { ...data } = toolData;
    console.log(data);

    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();

    return result;
};

export const getAll = async (token) => {
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const response = await fetch(`${baseUrl}?load=${relationQuery}`, {
        headers: {
            'X-Authorization': token
        }
    });
    let result = '';
    if (response.ok) {
        result = await response.json();
    }
    return result;
};

export const remove = async (toolId, token) => {
    const response = await fetch(`${baseUrl}/${toolId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
    return response;
};

export const getOne = async (toolId) => {
    const response = await fetch(`${baseUrl}/${toolId}`);
    const result = await response.json();
    return result;
}
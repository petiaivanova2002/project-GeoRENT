const baseUrl = "http://localhost:3030/data/tools"

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    // console.log(result)

    return result;
};

export const getOne = async (toolId) => {
    const response = await fetch(`${baseUrl}/${toolId}`);
    const result = await response.json();
    // console.log(result);

    return result;
};

export const create = async (toolData, token) => {
    const { ...data } = toolData;
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

export const remove = async (toolId) => {
    const response = await fetch(`${baseUrl}/${toolId}`, {
        method: 'DELETE'
    })
    const result = await response.json();
//    console.log(result)

    return result;
}

export const update = async ( toolData,toolId,token) => {
    const {...data} = toolData;
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
}
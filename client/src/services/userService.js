const baseUrl = "http://localhost:3030/users";

export const getOwner = async (ownerId,token) => {
    const response = await fetch(`${baseUrl}/${ownerId}`, {
        headers: {
            'X-Authorization': token
        }
    });
    const result = await response.json();
    console.log(result);
    return result;
}
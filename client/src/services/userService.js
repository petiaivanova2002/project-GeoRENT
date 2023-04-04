const baseUrl = "http://localhost:3030/users";

export const getOne = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);
    const result = await response.json();
    console.log(result);
    return result;
}
export const GetRequest = async (url) => {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
};

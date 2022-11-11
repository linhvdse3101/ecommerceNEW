import axios from 'axios';
const baseDomain = 'https://76.76.21.61:443'; // API for products
export const basePostUrl = 'https://https://76.76.21.61:443'; // API for post
export const baseStoreURL = 'https://76.76.21.61:443'; // API for vendor(store)

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

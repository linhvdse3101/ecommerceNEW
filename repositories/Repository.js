import axios from 'axios';
const baseDomain = 'https://https://ecommerceapi-jnhz2sg1b-linhvd3101.vercel.app'; // API for products
export const basePostUrl = 'https://https://ecommerceapi-jnhz2sg1b-linhvd3101.vercel.app'; // API for post
export const baseStoreURL = 'https://https://ecommerceapi-jnhz2sg1b-linhvd3101.vercel.app'; // API for vendor(store)

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

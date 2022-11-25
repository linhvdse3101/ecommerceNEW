import axios from 'axios';
// const baseDomain = 'https://ecommerceapi-kz2w.onrender.com/api'; // API for products
// export const basePostUrl = 'https://ecommerceapi-kz2w.onrender.com/api'; // API for post
// export const baseStoreURL = 'https://ecommerceapi-kz2w.onrender.com/api'; // API for vendor(store)

const baseDomain = 'http://localhost:1337/api'; // API for products
export const basePostUrl = 'http://localhost:1337/api'; // API for post
export const baseStoreURL = 'http://localhost:1337/api'; // API for vendor(store)
// const baseImgDomain = 'https://server.ldjvit.com'; // API for products


export const customHeaders = {
    Accept: 'application/json',
};
// export const baseImageUrl = `${baseImgDomain}`;
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

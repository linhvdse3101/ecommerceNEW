import axios from 'axios';
const baseDomain = 'https://ljdvitapi.onrender.com/api'; // API for products
export const basePostUrl = 'https://ljdvitapi.onrender.com/api'; // API for post
export const baseStoreURL = 'https://ljdvitapi.onrender.com/api'; // API for vendor(store)

// const baseDomain = 'http://localhost:1337/api'; // API for products
// export const basePostUrl = 'http://localhost:1337/api'; // API for post
// export const baseStoreURL = 'http://localhost:1337/api'; // API for vendor(store)
export const baseImageUrl = 'https://ldjvit-aws-s3-images.s3.amazonaws.com'; // API for vendor(store)

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
                `pagination[${encodeURIComponent(key)}]=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

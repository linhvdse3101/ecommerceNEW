import Repository, { baseUrl } from './Repository';

class MediaRespository {

    async getBannersBySlug(payload) {
        // const endPoint = `banners?slug=${payload}`;
        const endPoint = `banners?slug=${payload}&populate[0]=items&populate[1]=items.image`;
        const reponse = await Repository.get(`${baseUrl}/${endPoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data.data[0].attributes.items;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getPromotionsBySlug(payload) {
        const endPoint = `promotions?slug=${payload}&populate[0]=items&populate[1]=items.image`;
        const reponse = await Repository.get(`${baseUrl}/${endPoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data.data[0].attributes.items;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

}

export default new MediaRespository();

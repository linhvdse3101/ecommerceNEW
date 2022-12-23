import Repository, { baseUrl, serializeQuery } from './Repository';

class CollectionRepository {

    async getProductsByCollectionSlug(slug, query) {
        const response = await Repository.get(
            `${baseUrl}/collections?populate[0]=products&filters[slug][$eq]=${slug}&${serializeQuery(query)}`
        )
            .then((response) => {
                if (response.data.data && response.data.data.length > 0) {
                    return { items: response.data.data[0].attributes.products.data};
                } else {
                    return null;
                }
                return response.data.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }

    async getProductsByCategorySlug(slug, query) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?populate[0]=products&filters[slug][$eq]=${slug}&${serializeQuery(query)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data.data[0] };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new CollectionRepository();

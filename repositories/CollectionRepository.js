import Repository, { baseUrl } from './Repository';

class CollectionRepository {

    async getProductsByCollectionSlug(slug) {
        const response = await Repository.get(
            `${baseUrl}/collections?slug=${slug}&populate[0]=products&populate[1]=products.images`
        )
            .then((response) => {
                if (response.data.data && response.data.data.length > 0) {
                    switch (slug) {
                        case 'deal-of-the-day':
                            return { items: response.data.data[0].attributes.products };
                        case 'consumer-electronics':
                            return { items: response.data.data[1].attributes.products };
                        case 'clothings':
                            return { items: response.data.data[2].attributes.products };
                        case 'garden-and-kitchen':
                            return { items: response.data.data[3].attributes.products };
                        case 'new-arrivals-products':
                                return { items: response.data.data[4].attributes.products };    
                        default:
                            return { items: [] };
      
                    }
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

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug=${slug}`
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

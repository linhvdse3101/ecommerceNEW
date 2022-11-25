import Repository, { baseUrl, serializeQuery } from './Repository';

class ProductRepository {
    async getRecords(params) {
        const response = await Repository.get(
            `${baseUrl}/products?populate[0]=products&${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProducts(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?populate[0]=products&populate[1]=product_images&${serializeQuery(params)}}`
        )
            .then((response) => {
                if (response.data.data && response.data.data.length > 0) {
                    return response.data.data;
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

    async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories() {
        const reponse = await Repository.get(`${baseUrl}/product-categories?populate[0]=products`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsById(payload) {
        const reponse = await Repository.get(`${baseUrl}/products/${payload}?populate[0]=product_images`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?populate[0]=products&filters[slug][$eq]=${payload}`
        )
            .then((response) => {
                if (response.data.data) {
                    if (response.data.data.length > 0) {
                        return response.data.data[0].attributes;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?filters[slug][$eq]=${payload}&populate[0]=products`
        )
            .then((response) => {
                if (response.data.data) {
                    if (response.data.data.length > 0) {
                        return response.data.data[0].attributes;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByIds(payload) {
        const endPoint = `${baseUrl}/products?${payload}&populate[0]=product_images`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
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

export default new ProductRepository();

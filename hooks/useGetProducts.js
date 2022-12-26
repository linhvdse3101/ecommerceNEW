import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
    getTotalProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const meta = {
        limit: 10,
        start: 0,
        total: 0
    }
    const [totalMeta, setTotalMeta] = useState(0);

    return {
        loading,
        productItems,
        product,
        totalMeta,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
        getTotalProductsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getTotalProductsByCollectionHelper(payload);
            setTotalMeta(responseData == null ? 0 : responseData);
        },

        getProductsByCategory: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCategoriesHelper(payload);
            if (responseData) {
                setProductItems(responseData.items.data);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProducts: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload);
            } else {
                const queries = {
                    limit: 10,
                };
                responseData = await ProductRepository.getProducts(queries);
            }
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}

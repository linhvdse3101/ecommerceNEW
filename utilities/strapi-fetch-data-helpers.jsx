/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';

export async function getProductsByCollectionHelper(
    collectionSlug,
    pageSize = 10
) {
    let products;
    let pagination;
    const queries = {
        limit: pageSize,
    };
    const param = {
        collection: collectionSlug,
    };
    if (collectionSlug) {
        // products = await CollectionRepository.getProductsByCollectionSlug(
        //     collectionSlug,queries
        // );
        products = await ProductRepository.getProductByCollecionSlug(
            param,queries
        );
        pagination = await ProductRepository.getTotalProductByCollecionSlug(
            param,queries
        );

    } else {

        products = await ProductRepository.getRecords(queries);
    }
    if (products) {
        return products;
    } else {
        return null;
    }
    
}
export async function getTotalProductsByCollectionHelper(
    collectionSlug,
    pageSize = 10
) {
    let pagination = 0;
    const queries = {
        limit: pageSize,
    };
    const param = {
        collection: collectionSlug,
    };
    if (collectionSlug) {
        pagination = await ProductRepository.getTotalProductByCollecionSlug(
            param,queries
        );

    }
    return pagination;
}
export async function getProductsByCategoriesHelper(slug, pageSize = 10) {
    let products;
    let query = {
        limit: pageSize
    }
    if (slug) {
        products = await CollectionRepository.getProductsByCategorySlug(slug, queries);
    } else {
        const queries = {
            limit: pageSize,
        };
        products = await ProductRepository.getRecords(queries);
    }

    if (products) {
        return products;
    } else {
        return null;
    }
}

/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import StoreRepository from '~/repositories/StoreRepository';

export async function getStoresHelper(pageSize = 10) {
    let stores;
    const queries = {
        limit: pageSize,
    };
    stores = await StoreRepository.getStores(queries);
    if (stores) {
        return stores;
    } else {
        return null;
    }
}

import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
// import { useHistory } from "react-router-dom";

import Link from 'next/link';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import useGetProducts from '~/hooks/useGetProducts';

const NewArrivals = ({ collectionSlug, pageSize = 10 }) => {
    const { productItems, loading, totalMeta ,getProductsByCollection, getTotalProductsByCollection } = useGetProducts();
    const Router = useRouter();
    const { page } = Router.query;
    const { query } = Router;
    const [total, setTotal] = useState(0);
    
    function getTotalRecords() {
        setTotal(totalMeta);
    }
    function handlePagination(e) {
        console.log('Router', Router.pathname);
        console.log('query', Router.query);
        console.log('asPath', Router.asPath);
        // Router.push(`/?page=${e}`);


    }
    useEffect(() => {
        let params = {
            start: 0,
            limit: 10
        };
        if (query) {
            if (query.page) {
                params = {
                    // _start: page * pageSize,
                    start: page,
                    limit: pageSize,
                };
            } else {
                params = query;
                params.limit = pageSize;
            }
        } else {
            params = {
                limit: pageSize,
                start: 0
            };
        }
        getProductsByCollection(collectionSlug, params);
        getTotalProductsByCollection(collectionSlug, params)
        getTotalRecords(totalMeta);
        // handleSetColumns();
    }, [collectionSlug, page]);

    // console.log("products",products);
    // Views
    let productItemView;
    if (!loading) {
        if (productItems && productItems?.length > 0) {
            productItemView = productItems?.map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                    key={item.id}>
                    <ProductHorizontal product={item} />
                </div>
            ));
        } else {
            productItemView = <p>No product found.</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>Hot New Arrivals</h3>
                    <ul className="ps-section__links">
                        <li>
                            <Link href="/shop">
                                <a>Technologies</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Electronic</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Furnitures</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Clothing & Apparel</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=health-and-beauty">
                                <a>Health & Beauty</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">
                    <div className="row ps-shopping__content">{productItemView}</div>
                    {/* <div className="ps-shopping__footer text-center">
                        <div className="ps-pagination">
                            <Pagination
                                total={total - 1}
                                pageSize={pageSize}
                                responsive={true}
                                showSizeChanger={false}
                                current={page !== undefined ? parseInt(page) : 1}
                                onChange={(e) => handlePagination(e)}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;

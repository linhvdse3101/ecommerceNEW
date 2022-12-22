import React from 'react';
import LazyLoad from 'react-lazyload';
import { baseUrl,baseImageUrl } from '~/repositories/Repository';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';
// import { getHash } from 'next/dist/server/image-optimizer';

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === 'large') {
            if (source.images.data[0].attributes.formats.large) {
                image = source.images.data[0].attributes.formats.large.url;
            } else {
                image =source.image;
            }
        } else if (size && size === 'medium') {
            if (source.images.data[0].attributes.formats.medium) {
                image = source.images.data[0].attributes.formats.medium.url;
            } else {
                image =source.image;
            }
        } else if (size && size === 'thumbnail') {
            if (source.images.data[0].attributes.formats.thumbnail) {
                image = source.images.data[0].attributes.formats.thumbnail.url;
            } else {
                image =source.image;
            }
        } else if (size && size === 'small') {
            if (source.images.data[0].attributes.formats.small !== undefined) {
                image = source.images.data[0].attributes.formats.small.url;
            } else {
                image =source.image;
            }
        } else {
            image = source[0].attributes.url;
        }
        imageURL = `${image}`;

    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

function getProductImageURL(imageName, index) {
    return baseImageUrl+'/'+imageName+'-'+index+'.'+'jpg'
}


export default function useProduct() {
    return {
        thumbnailImage: (payload, size) => {
            if (payload) {
                if (payload.product_imgs
                    ) {
                    return (
                        <>
                            <LazyLoad>
                                <img
                                    src={getProductImageURL(payload?.bar_code, 1)}
                                    alt={getProductImageURL(payload?.bar_code, 1)}
                                />
                            </LazyLoad>
                        </>
                    );
                }
            }
        },
        price: (payload) => {
            let view;
            if (payload.sale_price) {
                view = (
                    <p className="ps-product__price sale">
                        <span>$</span>
                        {formatCurrency(payload.sale_price)}
                        <del className="ml-2">
                            <span>$</span>
                            {formatCurrency(payload.price)}
                        </del>
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>$</span>
                        {formatCurrency(payload.price)}
                    </p>
                );
            }
            return view;
        },
        badges: (payload) => {
            let view = null;
            if (payload.badges && payload.badges.length > 0) {
                const items = payload.badges.map((item) => {
                    if (item.value === 'hot') {
                        return (
                            <span
                                className="ps-product__badge hot"
                                key={item.id}>
                                Hot
                            </span>
                        );
                    }
                    if (item.value === 'new') {
                        return (
                            <span
                                className="ps-product__badge new"
                                key={item.id}>
                                New
                            </span>
                        );
                    }
                    if (item.value === 'sale') {
                        return (
                            <span
                                className="ps-product__badge sale"
                                key={item.id}>
                                Sale
                            </span>
                        );
                    }
                });
                view = <div className="ps-product__badges">{items}</div>;
            }
            return view;
        },
        badge: (payload) => {
            let view;
            if (payload.badge && payload.badge !== null) {
                view = payload.badge.map((badge) => {
                    if (badge.type === 'sale') {
                        return (
                            <div className="ps-product__badge">
                                {badge.value}
                            </div>
                        );
                    } else if (badge.type === 'outStock') {
                        return (
                            <div className="ps-product__badge out-stock">
                                {badge.value}
                            </div>
                        );
                    } else {
                        return (
                            <div className="ps-product__badge hot">
                                {badge.value}
                            </div>
                        );
                    }
                });
            }
            if (payload.sale_price) {
                const discountPercent = (
                    ((payload.price - payload.sale_price) /
                        payload.sale_price) *
                    100
                ).toFixed(0);
                return (
                    <div className="ps-product__badge">-{discountPercent}%</div>
                );
            }
            return view;
        },
        brand: (payload) => {
            let view;
            if (payload.brands && payload.brands.length > 0) {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">
                            {payload.brands[0].name}
                        </a>
                    </Link>
                );
            } else {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">No Brand</a>
                    </Link>
                );
            }
            return view;
        },
        title: (payload, id) => {
            let view = (
                <Link href="/product/[pid]" as={`/product/${id}`}>
                    <a className="ps-product__title">{payload.title}</a>
                </Link>
            );
            return view;
        },
    };
}

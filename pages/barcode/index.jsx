import Barcode from "react-barcode";
import React, { useState, useEffect } from "react";
import PageContainer from '~/components/layouts/PageContainer';
// import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import useGetProducts from '~/hooks/useGetProducts';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import ProductRepository from '~/repositories/ProductRepository';
import useProduct from '~/hooks/useProduct';

// import '~/scss/barcode.scss';

const barcode = () => {
    // const { productItems, loading, getProductsByCollection } = useGetProducts();
    const { thumbnailImage } = useProduct();

    const [bar, setBar] = useState("");
    const [products, setProducts] = useState(null);
    let productItemsViews;

    async function getTotalRecords() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            setProducts(responseData.data);
        }
    }

    function handleChange(e) {
        setBar(e.target.value);
    }

    useEffect(() => {
        getTotalRecords();
    }, [])

    if (products && products.length) {
        console.log('products', products);
        productItemsViews = products.map((item, index) => (

            <div>
                <h2>{item.attributes.title}</h2>
                <Barcode key={index} value={item?.attributes.slug
                    ? item?.attributes.slug : "generate code"} lineColor="black" />
            </div>
        ))
    }

    return (
        <PageContainer title="ldjvit Barcode page">
            <main id="Barcode">
                {/* <h1 className="textbarcode">ldjvit Barcode create</h1> */}
                {productItemsViews}
                <div className="appbarcode">
                    <Barcode value={bar ? bar : "generate code"} lineColor="black" />
                    <input
                        placeholder="Generate barcode"
                        type="text"
                        className="textboxbarcode"
                        onChange={handleChange}
                    />
                </div>
            </main>
        </PageContainer>

    );
};
export default barcode;
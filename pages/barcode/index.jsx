import Barcode from "react-barcode";
import React, { useState, useEffect } from "react";
import PageContainer from '~/components/layouts/PageContainer';
// import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import useGetProducts from '~/hooks/useGetProducts';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import ProductRepository from '~/repositories/ProductRepository';
import useProduct from '~/hooks/useProduct';
import {ExportToPDF} from './export-to-pdf'


// import '~/scss/barcode.scss';

const barcode = () => {
    // const { productItems, loading, getProductsByCollection } = useGetProducts();
    const { thumbnailImage } = useProduct();

    const [bar, setBar] = useState("");
    const [products, setProducts] = useState(null);
    const [barCode, setBarCode] = useState([]);

    let productItemsViews;
    const fileName = "barcode"


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
        productItemsViews = products.map((item, index) => (
            <div key={item.id}>
                <h2>{item.attributes.title}</h2>
                <Barcode value={item?.attributes.slug
                    ? item?.attributes.slug : "generate code"} lineColor="black"  />
            </div>
        ))
    }

    return (
        <PageContainer title="ldjvit Barcode page">
            <main id="Barcode">
                <div className="appbarcode">
                    <Barcode value={bar ? bar : "generate code"} lineColor="black" />
                    <input
                        placeholder="Generate barcode"
                        type="text"
                        className="textboxbarcode"
                        onChange={handleChange}
                    />
                </div>
                <ExportToPDF apiData={productItemsViews} fileName={fileName} />

            </main>
        </PageContainer>

    );
};
export default barcode;
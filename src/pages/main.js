import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { dataCategories, dataProducts, dataOrders } from "./data";
const defaultItemCategory = {
    categoryName: "Select City ..."
};
const defaultItemProduct = {
    productName: "Select State ..."
};
const defaultItemOrder = {
    orderName: "Select Neighborhood ..."
};

export const Apps = () => {
    const [state, setState] = React.useState({
        category: null,
        product: null,
        order: null,
        orders: dataOrders,
        products: dataProducts
    });


    const categoryChange = event => {
        const category = event.target.value;
        const products = dataProducts.filter(product => product.categoryId === category.categoryId);
        setState({ ...state,
            category: category,
            products: products,
            product: null,
            order: null
        });
    };

    const productChange = event => {
        const product = event.target.value;
        const orders = dataOrders.filter(order => order.productId === product.productId);
        setState({ ...state,
            product: product,
            orders: orders,
            order: null
        });
    };

    const orderChange = event => {
        setState({ ...state,
            order: event.target.value
        });
    };

    const category = state.category;
    const product = state.product;
    const order = state.order;
    const hasCategory = category && category !== defaultItemCategory;
    const hasProduct = product && product !== defaultItemProduct;
    return <div>
        <div style={{
            display: "inline-block"
        }}>
            Cities
            <br />
            <DropDownList data={dataCategories} textField="categoryName" onChange={categoryChange} defaultItem={defaultItemCategory} value={category} />
        </div>
        <div style={{
            display: "inline-block",
            marginLeft: "30px"
        }}>
            States
            <br />
            <DropDownList disabled={!hasCategory} data={state.products} textField="productName" onChange={productChange} defaultItem={defaultItemProduct} value={product} />
        </div>
        <div style={{
            display: "inline-block",
            marginLeft: "30px"
        }}>
            Neighborhoods
            <br />
            <DropDownList disabled={!hasProduct} data={state.orders} textField="orderName" onChange={orderChange} defaultItem={defaultItemOrder} value={order} />
        </div>
    </div>;
};
export default Apps;

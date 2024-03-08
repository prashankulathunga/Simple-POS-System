import DefaultCard from "./card/DefaultCard.tsx";
import '../App.css'
import DefaultChart from "./card/defaultChart.tsx";
import MinQtyCard from "./card/minQtyCard.tsx";
import AxiosInstance from "../components/config/axiosInstance.ts";
import React, {useEffect, useState} from "react";
import Product from "./product.tsx";

const Home: React.FC = () => {

    useEffect(() => {
        findAllProduct();
        findAllCount();
    }, []);

    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState<number | undefined>();
    const [customerCount, setCustomerCount] = useState<number | undefined>();
    const [orderCount, setOrderCount] = useState<number | undefined>();
    const [orderIncome, setOrderIncome] = useState<number | undefined>();

    const findAllProduct = async () => {
        try {

            const response = await AxiosInstance.get('/products/find-all-min');
            setProducts(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    const findAllCount = async () => {
        try {

            const productCount = await AxiosInstance.get('/products/find-all-count');
            setProductsCount(productCount.data);

            const customerCount = await AxiosInstance.get('/customers/find-all-count');
            setCustomerCount(customerCount.data);

            const orderCount = await AxiosInstance.get('/orders/find-all-count');
            setOrderCount(orderCount.data);

            const income = await AxiosInstance.get('/orders/find-all-income');
            setOrderIncome(income.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            <div className="container">
                <div className="row">

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/order-ahead-concept-illustration_114360-7290.jpg?w=740&t=st=1706262712~exp=1706263312~hmac=d57a54be0b8fcd016c0e99d72d03172fee160017677440209068fd23e38d145f'
                            description='This is a wider card with supporting text below.'
                            title='Customers'
                            value={customerCount} code={1}
                            key={1}

                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/shopping-mobile-app-online-store-service-smartphone-application-internet-purchase-making-order-customer-cartoon-character-adding-product-cart_335657-2557.jpg?w=740&t=st=1706262847~exp=1706263447~hmac=b6586b04950e183097f02ada3964d483e3a7836aaab923187b9ae2fdba34a212'
                            description='This is a wider card with supporting text below.'
                            title='Products'
                            value={productsCount} code={2}
                            key={2}

                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/order-food-concept-illustration_114360-6860.jpg?w=740&t=st=1706262559~exp=1706263159~hmac=bd6756ed0b9b35259aa0a9c68c9fd01d0f9125da13969893b20b4af38a92fc12'
                            description='This is a wider card with supporting text below.'
                            title='Orders'
                            value={orderCount} code={3}
                            key={3}

                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/cash-delivery-concept_23-2148787901.jpg?w=740&t=st=1706262530~exp=1706263130~hmac=a12b794bc66d9dd92f9d7f8c55355872fc8829ac2efb424673061da892370f57'
                            description='This is a wider card with supporting text below.'
                            title='Income'
                            value={orderIncome} code={4}
                            key={4}

                        />
                    </div>


                </div>
                <br/>
                <div className="row">
                    <br/>
                    <div className="col-12 col-md-9">
                        <DefaultChart/>
                    </div>
                    <div className="col-12 col-md-3">
<br/>
                        <div className="header">
                            <h3>Min Quantity Products </h3>
                            <hr/>
                            <br/>
                        </div>

                        {products.map((product, index) => (
                            <MinQtyCard key={index} name={product.productName} image={product.image}
                                        description={product.description}/>
                        ))}

                    </div>

                </div>


            </div>

        </>
    );

}

export default Home;

import DefaultCard from "./card/DefaultCard.tsx";
import '../App.css'
import DefaultChart from "./card/defaultChart.tsx";
import MinQtyCard from "./card/minQtyCard.tsx";

const cardArray = [
    {
        thumbnail: 'https://img.freepik.com/free-vector/order-ahead-concept-illustration_114360-7290.jpg?w=740&t=st=1706262712~exp=1706263312~hmac=d57a54be0b8fcd016c0e99d72d03172fee160017677440209068fd23e38d145f',
        description: 'This is a wider card with supporting text below.',
        title: 'Customers',
        value: 250,
        code: 1
    },
    {
        thumbnail: 'https://img.freepik.com/free-vector/shopping-mobile-app-online-store-service-smartphone-application-internet-purchase-making-order-customer-cartoon-character-adding-product-cart_335657-2557.jpg?w=740&t=st=1706262847~exp=1706263447~hmac=b6586b04950e183097f02ada3964d483e3a7836aaab923187b9ae2fdba34a212',
        description: 'This is a wider card with supporting text below.',
        title: 'Products',
        value: 250,
        code: 2
    },
    {
        thumbnail: 'https://img.freepik.com/free-vector/order-food-concept-illustration_114360-6860.jpg?w=740&t=st=1706262559~exp=1706263159~hmac=bd6756ed0b9b35259aa0a9c68c9fd01d0f9125da13969893b20b4af38a92fc12',
        description: 'This is a wider card with supporting text below.',
        title: 'Orders',
        value: 250,
        code: 3
    },
    {
        thumbnail: 'https://img.freepik.com/free-vector/cash-delivery-concept_23-2148787901.jpg?w=740&t=st=1706262530~exp=1706263130~hmac=a12b794bc66d9dd92f9d7f8c55355872fc8829ac2efb424673061da892370f57',
        description: 'This is a wider card with supporting text below.',
        title: 'Income',
        value: 250,
        code: 4
    }
];

function Home() {

    /*const maxWidthStyle:React.CSSProperties = {
        maxWidth:'540px'
    }*/

    return (

        <>
            <div className="container">
                <div className="row">
                    {
                        cardArray.map((cardData, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index + 1}>
                                <DefaultCard
                                    thumbnail={cardData.thumbnail}
                                    description={cardData.description}
                                    title={cardData.title}
                                    value={cardData.value}
                                    code={cardData.code}
                                />
                            </div>
                        ))
                    }
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-md-9">
                        <DefaultChart/>
                    </div>
                    <div className="col-12 col-md-3">
                        <MinQtyCard/>
                        <MinQtyCard/>
                        <MinQtyCard/>
                        <MinQtyCard/>
                    </div>

                </div>


            </div>

        </>
    );

}

export default Home;

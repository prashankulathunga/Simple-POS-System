import React, {useEffect, useState} from "react";
import axios from "axios";
import Customer from "./customer.tsx";
import Product from "./product.tsx";

interface Cart{
    _id: string | undefined,
    description:string | undefined,
    unitPrice:number | '',
    qty:number | undefined,
    total:number
}

const Order: React.FC = ()=> {

    const spaceLine: React.CSSProperties = {
        marginBottom: '16px',
        marginTop: '4px'
    }

    const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const[cart, setCart] = useState<Cart[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Product | null>(null);

    const[userQty, setUserQty] = useState<number>(0);

    const [UpdateName, setUpdateName] = useState('');
    const [UpdateAddress, setUpdateAddress] = useState('');
    const [UpdateSalary, setUpdateSalary] = useState<number | ''>();

    const [updateDescription, setUpdateDescription] = useState('');
    const [updateUnitPrice, setUpdateUnitPrice] = useState<number | ''>('');
    const [updateQtyOnHand, setUpdateQtyOnHand] = useState<number | ''>('');

    const [netTotal, setNetTotal] = useState<number | 0>(0);

    useEffect(() => {
        findAllCustomer();
        findAllProduct();
    }, []);


    const selectOneData = async (id)=>{
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-by-id/'+id);
        console.log(response.data);
        setSelectedCustomer(response.data);
        setUpdateName(response.data.name);
        setUpdateAddress(response.data.address);
        setUpdateSalary(response.data.salary === ''? '' : parseFloat(response.data.salary));
    }

    const selectOnProductData = async (id)=>{
        const response = await axios.get('http://localhost:3000/api/v1/products/find-by-id/'+id);

        setSelectedProduct(response.data);
        setUpdateDescription(response.data.description);
        setUpdateUnitPrice(response.data.unitPrice === ''? '' : parseFloat(response.data.unitPrice));
        setUpdateQtyOnHand(response.data.qtyOnHand === ''? '' : parseFloat(response.data.qtyOnHand));
    }

    const findAllCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
            setCustomerDetails(response.data);
            console.log(customerDetails);

        }catch (error){
            console.log(error);
        }
    }

    const findAllProduct = async () => {
        try {

            const response = await axios.get('http://localhost:3000/api/v1/products/find-all?searchText=&page=1&size=10');
            setProducts(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = (newItem:Cart)=>{
        setCart(prevState => [...prevState, newItem]);
    }

    const saveOrder = async ()=>{
        try{

            await axios.post('http://localhost:3000/api/v1/orders/create',{
                date:new Date(),
                customerDetails: selectedCustomer,
                totalCost:250,
                products:cart
            });

            alert('Order was Saved!');

        }catch(error){
            console.log(error);
        }
    }

    return (

        <>
            <div className="container">

                <div className="header">
                    <h3>Order Section</h3>
                    <hr/>
                    <br/>
                </div>

                <form onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="selectCustomer">Select Customer</label>
                                <select className="form-control" id="selectCustomer" onChange={(e)=>{
                                    selectOneData(e.target.value);

                                }}>
                                    <option value='use options' defaultValue='use options'>None Select One</option>

                                    {customerDetails.map((customer, index)=>(
                                        <option key={index+1} value={customer._id} >{customer.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>


                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input defaultValue={UpdateName} type="text" className="form-control" name="customerName" id="customerName"
                                       disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerAddress">Customer Address</label>
                                <input defaultValue={UpdateAddress} type="text" className="form-control" name="customerName" id="customerAddress"
                                       disabled/>
                            </div>

                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerSalary">Salary</label>
                                <input defaultValue={UpdateSalary} type="number" className="form-control" name="customerName" id="customerSalary"
                                       disabled/>
                            </div>
                        </div>
                    </div>
                    <hr/>


                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="selectProduct">Select Product</label>
                                <select className="form-control" id="selectProduct" onChange={(e)=>{
                                    selectOnProductData(e.target.value);
                                }}>
                                    <option value='use options' defaultValue='use options'>Select Product</option>
                                    {products.map((product, index)=>(
                                          <option key={index+1} value={product._id}>{product.productName}</option>
                                    )) }


                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="Productdescription">Product Description</label>
                                <input defaultValue={updateDescription} type="text" className="form-control" name="Productdescription"
                                       id="Productdescription" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="unitPrice">Unit Price</label>
                                <input defaultValue={updateUnitPrice} type="text" className="form-control" name="unitPrice" id="unitPrice" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="qtnOnHand"> QTY On Hand</label>
                                <input defaultValue={updateQtyOnHand} type="text" className="form-control" name="qtnOnHand" id="qtnOnHand" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="qty">QTY</label>
                                <input onChange={(e)=>{
                                    setUserQty(parseFloat(e.target.value));
                                }} type="text" className="form-control" name="qty" id="qty"/>
                            </div>
                        </div>

                    </div>


                    <br/>
                    <div className="row">
                        <div className="col-12 ">
                            <button className='btn btn-primary col-12' type="submit" onClick={()=>{

                                const cartProduct:Cart = {

                                    _id: selectedProduct?._id,
                                    description:updateDescription,
                                    unitPrice:updateUnitPrice,
                                    qty:userQty,
                                    total:(userQty*(updateUnitPrice?updateUnitPrice:0))

                                }

                                addToCart(cartProduct);
                                setNetTotal((netTotal + cartProduct.total?cartProduct.total:0));


                                setUpdateDescription('');
                                setUpdateUnitPrice('');
                                setUpdateQtyOnHand('');

                            }}>+ Add Product</button>
                        </div>
                    </div>
                </form>
                <hr/>
                <br/>

                <div className="row">
                    <div className="col-12">
                        <form>
                            <input type="search" className="form-control" name="customerSearch" id="customerSearch"
                                   placeholder="search customer here"/>
                        </form>
                    </div>
                </div>

                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th>product Number</th>
                                <th>Description</th>
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>

                            {cart.map((data,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{data.description}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={()=>{
                                            setCart((prevState)=>prevState.filter((cartData)=>cartData._id != data._id));

                                            setNetTotal((netTotal - data.total?data.total:0));

                                        }}>Remove</button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <hr/>
                <div className="row">
                    <div className="bottom-outer">
                        <h1 style={{color: "#34495e", fontWeight: "bold"}}>Total: {netTotal}</h1>
                        <button className="btn btn-warning col-2" onClick={saveOrder}>Place Order</button>
                    </div>
                </div>


            </div>

        </>
    );

}

export default Order;
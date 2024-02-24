import React, {useEffect, useState} from "react";
import axios from "axios";
import {Modal} from 'react-bootstrap'
interface Product {
    _id: string;
    productName: string;
    description: string;
    image: string;
    unitPrice: number;
    qtyOnHand: number;
}


const Product: React.FC = () => {

    const spaceLine = {
        marginBottom: '16px'
    }

    const [products, setProducts] = useState<Product[]>([]);

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');

    const [updateProductName, setUpdateProductName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateUnitPrice, setUpdateUnitPrice] = useState<number | ''>('');
    const [updateQtyOnHand, setUpdateQtyOnHand] = useState<number | ''>('');

    const[modalState, setModalState] = useState(false);

    useEffect(() => {
        findAllProduct();
    }, []);

    const loadModel = async (id)=>{

    try {

       const response = await axios.get('http://localhost:3000/api/v1/products/find-by-id/'+id);

        setProductId(response.data._id);
        setUpdateProductName(response.data.productName);
        setUpdateDescription(response.data.description);
        setUpdateUnitPrice(response.data.unitPrice);
        setUpdateQtyOnHand(response.data.qtyOnHand);
        setModalState(true);

    } catch (error) {
        console.log(error);
    }

    }


    const saveProduct = async () => {

        try {

            const response = await axios.post('http://localhost:3000/api/v1/products/create', {
                productName,
                description,
                unitPrice,
                qtyOnHand
            });
            console.log(response);
            findAllProduct();

            setProductName('');
            setDescription('');
            setUnitPrice('');
            setQtyOnHand('');


        } catch (error) {
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
    const deleteProduct = async (id) => {
        try {

            await axios.delete('http://localhost:3000/api/v1/products/delete-by-id/'+id);
            findAllProduct();

        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async ()=>{
        try {

            await axios.put('http://localhost:3000/api/v1/products/update/'+productId, {
                productName:updateProductName,
                description:updateDescription,
                unitPrice:updateUnitPrice,
                qtyOnHand:updateQtyOnHand
            });
            setModalState(false);
            findAllProduct();

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>

            <div className="container">

                <div className="header">
                    <h3>Product Section</h3>
                    <hr/>
                    <br/>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="ProductName">Product Name</label>
                                <input type="text" value={productName} className="form-control" name="ProductName"
                                       id="ProductName" onChange={(e) => {
                                    setProductName(e.target.value);
                                }}/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="unitPrice">Unit Price</label>
                                <input type="number" value={unitPrice} className="form-control" name="unitPrice"
                                       id="unitPrice" onChange={(e) => {
                                    setUnitPrice(parseFloat(e.target.value));
                                }}/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="qtOnHand">Qty On Hand</label>
                                <input type="number" value={qtyOnHand} className="form-control" name="qtOnHand"
                                       id="qtOnHand" onChange={(e) => {
                                    setQtyOnHand(parseFloat(e.target.value));
                                }}/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="productImage">Product Image</label>
                                <input type="file" className="form-control" name="productImage" id="productImage"/>
                            </div>
                        </div>
                        <br/>
                        <div className="col-12 ">
                            <div className="form-group">
                                <label htmlFor="Productdescription">Product Description</label>
                                <textarea rows={3} value={description} className="form-control"
                                          name="Productdescription" id="Productdescription" onChange={(e) => {
                                    setDescription(e.target.value);
                                }}/>
                            </div>
                        </div>

                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-12 ">
                            <button className='btn btn-primary col-12' type="submit" onClick={saveProduct}>Save
                                Product
                            </button>
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
                                <th>Product Name</th>
                                <th>Qty On Hand</th>
                                <th>Unit Price</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                                <th>More Info</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                products.map((product, index) =>

                                    <tr key={index}>
                                        <td>{product.productName}</td>
                                        <td>{product.qtyOnHand}</td>
                                        <td>{product.unitPrice}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={()=>{
                                                        if (confirm('Are you sur?')){
                                                            deleteProduct(product._id);
                                                        }
                                                    }}>Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success" onClick={()=>{
                                                loadModel(product._id);
                                            }}>Update</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-warning">See More</button>
                                        </td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={modalState}>

                <form>
                    <div className="p-4">

                        <h2>Update Product</h2>
                        <hr/>
                        <br/>

                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={updateProductName} type='text' className='form-control' onChange={(e)=>{
                                    setUpdateProductName(e.target.value);
                                }}/>
                            </div>

                        </div>
                        <br/>
                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={updateQtyOnHand} type='number' className='form-control' onChange={(e)=>{
                                    setUpdateQtyOnHand(parseFloat(e.target.value));
                                }}/>
                            </div>
                        </div>
                        <br/>
                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={updateUnitPrice} type='number' className='form-control' onChange={(e)=>{
                                    setUpdateUnitPrice(parseFloat(e.target.value));
                                }}/>
                            </div>
                        </div>

                        <br/>
                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={updateDescription} type='text' className='form-control' onChange={(e)=>{
                                    setUpdateDescription(e.target.value);
                                }}/>
                            </div>
                        </div>

                        <br/>
                        <div className="col-12">
                            <button type='button' className='btn btn-success col-12' onClick={updateProduct}>Update Product</button>
                        </div>

                        <div className="col-12" style={{marginTop:"12px"}}>
                            <button type='button' className='btn btn-secondary col-12' onClick={()=>{
                                setModalState(false);
                            }} > Close </button>
                        </div>


                    </div>

                </form>

            </Modal>



        </>
    );

}

export default Product;
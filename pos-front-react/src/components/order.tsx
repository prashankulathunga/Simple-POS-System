function Order() {

    const spaceLine = {
        marginBottom: '16px',
        marginTop: '4px'
    }

    return (

        <>
            <br/>
            <div className="container">

                <form>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="selectCustomer">Select Customer</label>
                                <select className="form-control" id="selectCustomer">
                                    <option value='use options' disabled defaultValue='use options'>Select Customer
                                    </option>
                                    <option value='#'>Customer 1</option>
                                    <option value='#'>Customer 2</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input type="text" className="form-control" name="customerName" id="customerName"
                                       disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerAddress">Customer Address</label>
                                <input type="text" className="form-control" name="customerName" id="customerAddress"
                                       disabled/>
                            </div>

                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="customerSalary">Salary</label>
                                <input type="number" className="form-control" name="customerName" id="customerSalary"
                                       disabled/>
                            </div>
                        </div>
                    </div>
                    <hr/>


                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="selectProduct">Select Product</label>
                                <select className="form-control" id="selectProduct">
                                    <option value='use options' disabled defaultValue='use options'>Select Product
                                    </option>
                                    <option value='#'>Product 1</option>
                                    <option value='#'>Product 2</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-3" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="Productdescription">Product Description</label>
                                <input type="text" className="form-control" name="Productdescription"
                                       id="Productdescription" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="unitPrice">Unit Price</label>
                                <input type="text" className="form-control" name="unitPrice" id="unitPrice" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="qtnOnHand"> QTY On Hand</label>
                                <input type="text" className="form-control" name="qtnOnHand" id="qtnOnHand" disabled/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-4 col-md-2" style={spaceLine}>
                            <div className="form-group">
                                <label htmlFor="qty">QTY</label>
                                <input type="text" className="form-control" name="qty" id="qty"/>
                            </div>
                        </div>

                    </div>


                    <br/>
                    <div className="row">
                        <div className="col-12 ">
                            <button className='btn btn-primary col-12' type="submit">+ Add Product</button>
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
                        <table className='table table-hover table-hover'>
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Baby Sop</td>
                                <td>220.00</td>
                                <td>10</td>
                                <td>2200.00</td>
                                <td>
                                    <button className="btn btn-sm btn-danger">Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Lux Sop</td>
                                <td>260.00</td>
                                <td>12</td>
                                <td>2600.00</td>
                                <td>
                                    <button className="btn btn-sm btn-danger">Remove</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <hr/>
                <div className="row">
                    <div className="bottom-outer">
                        <h1 style={{color: "#34495e", fontWeight: "bold"}}>Total: 2660.00</h1>
                        <button className="btn btn-warning col-2">Place Order</button>
                    </div>
                </div>


            </div>

        </>
    );

}

export default Order;
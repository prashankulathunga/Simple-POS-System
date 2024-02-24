import React, {useEffect, useState} from "react";
import axios from "axios";
import {Modal} from 'react-bootstrap'


interface Customer {
    _id:string,
    name: string,
    address: string,
    salary: number,
}

const Customer: React.FC = () => {

    const[modalState, setModalState] = useState(false);

    const [customers, setCustomers] = useState<Customer[]>([])
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [customerId, setCustomerId] = useState('');
    const [UpdateName, setUpdateName] = useState('');
    const [UpdateAddress, setUpdateAddress] = useState('');
    const [UpdateSalary, setUpdateSalary] = useState<number | ''>(0);

    useEffect(() => {
        findAllCustomer();
    }, []);


    const updateCustomer = async (id)=>{
        const response = await axios.put('http://localhost:3000/api/v1/customers/update/'+id, {name:UpdateName, address:UpdateAddress, salary:UpdateSalary});
        console.log(response);
        setModalState(false);
        findAllCustomer();
    }

    const loadModel = async (id)=>{
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-by-id/'+id);
        console.log(response.data);
        setCustomerId(response.data._id);
        setUpdateName(response.data.name);
        setUpdateAddress(response.data.address);
        setUpdateSalary(response.data.salary);
        setModalState(true);

    }

    const deleteCustomer= async (id)=>{
        try {
            await axios.delete('http://localhost:3000/api/v1/customers/delete-by-id/'+id);
            findAllCustomer();
        }catch (error){
            console.log(error);
        }
    }

    const findAllCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
            setCustomers(response.data);
        }catch (error){
            console.log(error);
        }
    }

    const saveCustomer = async () => {

        try {

            const response = await axios.post('http://localhost:3000/api/v1/customers/create', {name, address, salary});
            console.log(response);
            findAllCustomer();
            setName('');
            setAddress('');
            setSalary('');


        } catch (error) {
            console.log(error);
        }


    }


    return (
        <>

            <div className="container">

                <div className="header">
                    <h3>Customer Section</h3>
                    <hr/>
                    <br/>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input value={name} type="text" className="form-control" name="customerName"
                                       id="customerName"
                                       onChange={(e) => {
                                           setName(e.target.value);
                                       }}/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerAddress">Customer Address</label>
                                <input value={address} type="text" className="form-control" name="customerName"
                                       id="customerAddress"
                                       onChange={(e) => {
                                           setAddress(e.target.value);
                                       }}/>
                            </div>

                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="form-group">
                                <label htmlFor="customerSalary">Salary</label>
                                <input value={salary} type="number" className="form-control" name="customerName"
                                       id="customerSalary"
                                       onChange={(e) => {
                                           setSalary(e.target.value === '' ? '' : parseFloat(e.target.value))
                                       }}/>
                            </div>
                        </div>

                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-12 ">
                            <button className='btn btn-primary col-12' type="submit" onClick={saveCustomer}>Save Customer
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
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Delete Option</th>
                                <th>Update Option</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                customers.map((customer, index)=>
                                    <tr key={index}>

                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.salary}</td>
                                        <td>
                                            <button onClick={()=>{

                                            if (confirm('Are You sure?')){
                                                deleteCustomer(customer?._id);
                                            }

                                            }} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success" onClick={()=>{
                                                loadModel(customer?._id);
                                            }} >Update</button>
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

                        <h2>Update Customer</h2>
                        <hr/>
                            <br/>

                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={UpdateName} type='text' className='form-control' onChange={(e)=>{
                                    setUpdateName(e.target.value);
                                }}/>
                            </div>

                        </div>
                        <br/>
                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={UpdateAddress} type='text' className='form-control' onChange={(e)=>{
                                    setUpdateAddress(e.target.value);
                                }}/>
                            </div>
                        </div>
                        <br/>
                        <div className="col-12">
                            <div className="form-group">
                                <input defaultValue={UpdateSalary} type='text' className='form-control' onChange={(e)=>{
                                    setUpdateSalary(parseFloat(e.target.value));
                                }}/>
                            </div>
                        </div>

            <br/>
                        <div className="col-12">
                            <button type='button' className='btn btn-success col-12' onClick={()=>{
                                updateCustomer(customerId);
                            }}>Update Customer</button>
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

export default Customer;
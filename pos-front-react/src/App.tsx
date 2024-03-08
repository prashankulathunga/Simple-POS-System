import {BrowserRouter as Router, Routes, Route, Link,} from "react-router-dom";
import './App.css'
import Home from "./components/home.tsx";
import Customer from "./components/customer.tsx";
import Product from "./components/product.tsx";
import Order from "./components/order.tsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/login.tsx";
import Signup from "./components/signup.tsx";

function App() {

    return (

        <Router>

            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-brand">

                            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad-logo-vector.svg/1200px-Wattpad-logo-vector.svg.png"
                                 alt="logo"/>

                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link active" aria-current="page"><span className="check">Home</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/customer'} className="nav-link"><span className="check">Customer</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/product'} className="nav-link"><span className="check">Product</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/order'} className="nav-link" aria-disabled="true"><span className="check">OrderManagement</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/login'} className="nav-link" aria-disabled="true"><span className="check">LoginSystemTemp</span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <hr/>
            <div style={{marginBottom:'78px'}}></div>
            <Routes>

                <Route path='/' element={<Home/>}/>
                <Route path='/customer' element={<Customer/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>

            </Routes>
        </Router>


    );
}

export default App

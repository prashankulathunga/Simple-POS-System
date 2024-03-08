import React, {useState} from "react";
import {Link} from "react-router-dom";
import AxiosInstance from "../components/config/axiosInstance.ts";

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = async () => {

        try {

            const response = await AxiosInstance.post('/users/login', {email, password});
            console.log(response.data);


            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);


            const cookieValue = encodeURIComponent('token') + '=' + encodeURIComponent(response.data) + '; expires =' + expirationDate.toUTCString() + '; path=/';


            document.cookie = cookieValue;

        } catch (e) {
            console.log(e);
        }


    }

    return (

        <>

            <div className="container">

                <div className="login-outer">
                    <div className="login-inner">

                        <div className="top-outer">
                            <div className="header-outer">
                                <h1>Let's Login</h1>
                                <p>If you have login information please insert and login</p>
                            </div>
                        </div>


                        <div className="bottom-outer">

                            <div className="row">
                                <div className="col-12" >
                                    <div className="form-group">
                                        <label htmlFor='username'>Email </label>
                                        <input type='email' className='form-control col-12' placeholder='email here'
                                               onChange={(e) => {
                                                   setEmail(e.target.value);
                                               }}/>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor='username'>Password </label>
                                        <input type='password' className='form-control' placeholder='password here'
                                               onChange={(e) => {
                                                   setPassword(e.target.value);
                                               }}/>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <button type='submit' className='btn btn-primary col-12' onClick={login}>Login
                                    </button>
                                </div>

                                <div className="col-12">
                                    <Link to={'/signup'} className='btn btn-outline-dark col-12'> Sign up </Link>

                                </div>

                            </div>


                        </div>

                    </div>


                </div>

            </div>


        </>
    );

}

export default Login;
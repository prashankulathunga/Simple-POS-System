import {Link} from "react-router-dom";
import React, {useState} from "react";
import AxiosInstance from "../components/config/axiosInstance.ts";

const Signup: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const register = async () => {
        try {

            await AxiosInstance.post('/users/register', {fullName, email, password});

            setFullName('');
            setEmail('');
            setPassword('');


        } catch (error) {
            console.log(error);
        }

    }


    return (

        <>

            <div className="container">

                <div className="login-outer">
                    <div className="login-inner">

                        <div className="top-outer">
                            <div className="header-outer">
                                <h1>Let's Sign Up</h1>
                                <p>If you don't have account please sign up</p>
                            </div>
                        </div>


                        <div className="bottom-outer">

                            <div className="row">

                                <div className="col-12" style={{marginBottom: '18px'}}>
                                    <div className="form-group">
                                        <label htmlFor='username'>Full Name </label>
                                        <input defaultValue={fullName} type='text' className='form-control col-12' placeholder='email here'
                                               onChange={(e) => {
                                                   setFullName(e.target.value);
                                               }}/>
                                    </div>
                                </div>

                                <div className="col-12" style={{marginBottom: '18px'}}>
                                    <div className="form-group">
                                        <label htmlFor='username'>Email </label>
                                        <input defaultValue={email} type='email' className='form-control col-12' placeholder='email here'
                                               onChange={(e) => {
                                                   setEmail(e.target.value);
                                               }}/>
                                    </div>
                                </div>


                                <div className="col-12" style={{marginBottom: '18px'}}>
                                    <div className="form-group">
                                        <label htmlFor='username'>Password </label>
                                        <input defaultValue={password} type='password' className='form-control' placeholder='password here'
                                               onChange={(e) => {
                                                   setPassword(e.target.value);
                                               }}/>
                                    </div>
                                </div>


                                <div className="col-12" style={{marginTop: '20px'}}>
                                    <button type='submit' className='btn btn-primary col-12' onClick={register}>Sign
                                        Up
                                    </button>
                                </div>

                                <div className="col-12" style={{marginTop: '16px'}}>
                                    <Link to={'/login'} className='btn btn-outline-dark col-12'> Login </Link>

                                </div>

                            </div>


                        </div>

                    </div>


                </div>

            </div>


        </>


    );

}

export default Signup;
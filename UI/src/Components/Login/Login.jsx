// Import Modules
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { toast } from 'react-toastify';

// Services
import Users from './../../Services/Users/Users';

// Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(false);
    const usersService = new Users();

    const handleNavigation = (url) => {
        props.history.push(url);
    }

    const handleLogin = async (event) => {
        if (event) event.preventDefault();

        setSubmitStatus(true);

        if (email && password) {
            setSubmitStatus(false);
            const response = await usersService.login({ email, password });

            if (response?.status === 200) {
                toast.success(response.data.message);
                cookies.set('accessToken', response.data.data.authToken)
                props.history.replace('/products');
            } else {
                toast.error(response.data.message);
            }
        }
    }

    return (
        <div className="login-wrapper display-flex">
            <div className="container">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                    </div>

                    <div className="col-md-7 col-lg-6 ml-auto">
                        <Card>
                            <CardBody>
                                <CardTitle className="primary-color" tag="h5">Login</CardTitle>
                                <form onSubmit={handleLogin}>
                                    <div className="row">
                                        <div className="form-group col-12 mt-2 mb-4">
                                            <label className="mb-1">Email</label>
                                            <input type="email" className="form-control" onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" />
                                            {
                                                submitStatus && !email &&
                                                <small className="text-danger">Please enter email address</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mb-4">
                                            <label className="mb-1">Password</label>
                                            <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" />
                                            {
                                                submitStatus && !password &&
                                                <small className="text-danger">Please enter password</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mx-auto mb-0">
                                            <Button type="submit" className="btn-block btn-primary py-2">Login</Button>
                                        </div>
                                        <CardText className="text-center col-12 mt-4">
                                            Don't have an account?
                                            <a className="primary-color" href="/" onClick={(e) => handleNavigation("register")}> Register</a>
                                        </CardText>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
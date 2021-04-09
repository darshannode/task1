// Import Modules
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { toast } from 'react-toastify';

// Services
import Users from './../../Services/Users/Users';

const Register = (props) => {
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(false);
    const usersService = new Users();

    const handleNavigation = (url) => {
        props.history.push(url);
    }

    const handleRegister = async (event) => {
        if (event) event.preventDefault();

        setSubmitStatus(true);

        if (name && phoneNumber && email && password) {
            setSubmitStatus(false);
            const response = await usersService.register({ name, email, phoneNumber, password });

            if (response?.status === 200) {
                toast.success(response.data.message);
                props.history.replace('/login');
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
                                <CardTitle className="primary-color" tag="h5">Register</CardTitle>
                                <form onSubmit={handleRegister}>
                                    <div className="row">
                                        <div className="form-group col-12 mt-2 mb-4">
                                            <label className="mb-0">Business name</label>
                                            <input type="text" className="form-control" onChange={(event) => setName(event.target.value)} placeholder="Business name" />
                                            {
                                                submitStatus && !password &&
                                                <small className="text-danger">Please enter business name</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mb-4">
                                            <label className="mb-0">Email address</label>
                                            <input type="email" className="form-control" onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" />
                                            {
                                                submitStatus && !email &&
                                                <small className="text-danger">Please enter email address</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mb-4">
                                            <label className="mb-0">Password</label>
                                            <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                                            {
                                                submitStatus && !password &&
                                                <small className="text-danger">Please enter password</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mb-4">
                                            <label className="mb-0">Phone number</label>
                                            <input type="number" className="form-control" onChange={(event) => setPhoneNumber(event.target.value)} placeholder="Enter phone number" />
                                            {
                                                submitStatus && !password &&
                                                <small className="text-danger">Please enter phone number</small>
                                            }
                                        </div>
                                        <div className="form-group col-12 mx-auto mb-0">
                                            <Button type="submit" className="btn-block btn-primary py-2">Sign up</Button>
                                        </div>
                                        <CardText className="text-center col-12 mt-4">
                                            Already have an account?
                                            <a className="primary-color" href="/" onClick={(e) => handleNavigation("login")}> Login</a>
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

export default withRouter(Register);
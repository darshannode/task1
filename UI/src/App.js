// Import Modules
import Route from 'react-router-hooks'
import React from 'react'

import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Import Routes 
import routes from './routes'

// Import Css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/custom.css';
import './App.css';

// Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const App = () => {
    const requireAuth = (nextState, replace) => {
        const accessToken = cookies.get('accessToken');
        let loginRequired = ['/products'];
        let disAllowOnLogin = ['/', '/login', '/register'];

        if (accessToken && disAllowOnLogin.includes(nextState.path)) replace({ pathname: '/products' });
        if (!accessToken && loginRequired.includes(nextState.path)) replace({ pathname: '/login' });
    }

    return (
        <BrowserRouter>
            <div className="page-wrapper">
                <Switch>
                    {
                        routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                onEnter={requireAuth}
                                component={route.component}
                            />
                        ))
                    }
                </Switch>

                <ToastContainer autoClose={10000} hideProgressBar={true} closeOnClick pauseOnFocusLoss={false} pauseOnHover />
            </div>
        </BrowserRouter>
    );
}

export default App;

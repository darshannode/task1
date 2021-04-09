import React from 'react'

// Components
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'

const routes = [{
    path: "/products",
    exact: true,
    component: () => <Products />
}, {
    path: "/register",
    exact: true,
    component: () => <Register />
}, {
    path: "/login",
    exact: true,
    component: () => <Login />
}, {
    path: "/",
    exact: true,
    component: () => <Login />
}];

export default routes;
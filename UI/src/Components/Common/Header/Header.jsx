// Import Modules
import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, NavbarBrand } from 'reactstrap';

// Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Header = (props) => {
    const handleNavigation = async (event) => {
        if (event) event.preventDefault();
    }

    const handleLogout = async (event) => {
        if (event) event.preventDefault();

        cookies.remove('accessToken');

        props.history.replace('/login');
    }

    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" onClick={handleNavigation} className="title mr-auto">Product Management</NavbarBrand>

            <NavbarBrand href="/" className="logout" onClick={handleLogout}>Logout</NavbarBrand>
        </Navbar>
    );
}

export default withRouter(Header);
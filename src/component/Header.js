import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='mx-auto'>
            <Link to='/'>Register</Link>
            <Link to='/login'>Login</Link>
        </div>
    );
};

export default Header;
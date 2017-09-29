import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Link } from 'react-router-dom'


import App from './components/App';
import NotFoundPage from './components/pages/not-found-page';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/auth/require-auth';

const Header = () => (
<nav>
        <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/register'>Roster</Link></li>
        <li><Link to='/login'>Schedule</Link></li>
        </ul>
        </nav>
);

export default Header

// <Route path="dashboard" component={RequireAuth(Dashboard)} />
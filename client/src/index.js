import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import reduxThunk from 'redux-thunk';
// import routes from './routes';
import { render } from 'react-dom'
import reducers from './reducers/index';
import { Link } from 'react-router-dom'
import { AUTH_USER } from './actions/types';
import App from './components/App';
// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ), document.getElementById('root')
);
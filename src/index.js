import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from  'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from  'redux';

import Search from './screens/Search';
import reducers from './reducers';
ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <div>
            <BrowserRouter>
                <Route path="/" component={Search}/>
            </BrowserRouter>
        </div>
    </Provider>, document.getElementById('root')
);
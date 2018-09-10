import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';

// Components
import Home from './containers/Home.container';
import Cart from './containers/Cart.container';
import NotFound from './components/NotFound/NotFount';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Component styles
require('./app.scss');

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main-body">
                    <Switch>
                        <Route
                            exact
                            path='/'
                            component={Home} />
                        <Route
                            path='/cart'
                            component={Cart} />
                        <Route
                            component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default hot(module)(App);;
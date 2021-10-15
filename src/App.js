import './App.css';
import React from 'react';
import {Switch} from 'react-router';
import {Route} from 'react-router-dom';
import Taxes from "./components/taxes";

const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={'/'} exact={true} component={Taxes} />
            </Switch>
        </React.Fragment>
    );
};

export default App;

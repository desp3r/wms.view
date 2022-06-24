import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/home' component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";
import { Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
// import {Redirect} from "react-router-dom"; для обработки ошибки

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
            </Switch>
        </div>
    );
};

export default App;

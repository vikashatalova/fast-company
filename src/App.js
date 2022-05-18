import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userId?/:edit?" component={Users}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    );
};

export default App;

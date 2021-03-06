import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./components/layouts/logOut";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavBar/>
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route exact
                                path="/"
                                component={Main}
                            />
                            <Route
                                path="/login/:type?"
                                component={Login}
                            />
                            <Route path="/logout" component={LogOut}/>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
};

export default App;

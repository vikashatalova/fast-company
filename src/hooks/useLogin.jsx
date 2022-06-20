import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens } from "../services/localStorage.service";
import { toast } from "react-toastify";

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);
    async function signInWithPassword ({ email, password }) {
        const keyFireBaseLogin = "AIzaSyBmAhedqg2RCjmYTM86WhQOWw2l6eOM_n0";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFireBaseLogin}`;
        try {
            const { data } = await httpLogin.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            console.log(data);
        } catch (error) {
            errorCatcher();
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <LoginContext.Provider value={{ signInWithPassword }}>
            {children}
        </LoginContext.Provider>
    );
};
LoginProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default LoginProvider;

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";

export const httpAuth = axios.create({
    // baseURL: "https://identitytoolkit.googleapis.com/v1/",
    baseURL: "https://securetoken.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    console.log(process.env.REACT_APP_FIREBASE_KEY);
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function logIn ({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url,
                {
                    email,
                    password,
                    returnSecureToken: true
                });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                case "INVALID_PASSWORD":
                    throw new Error("Email или пароль введены неккоректно");
                default:
                    throw new Error("Слишком много попыток входа. Попробуйте позднее");
                }
            }
        }
    }

    async function signUp ({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url,
                {
                    email,
                    password,
                    returnSecureToken: true
                });
            setTokens(data);
            await createUser({ _id: data.localId, email, rate: randomInt(1, 5), completedMeetings: randomInt(0, 200), ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };
    async function createUser (data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function getUserdata () {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        if (localStorageService.getAcessToken()) {
            getUserdata();
        }
    }, []);
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
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            { children }
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    // https://securetoken.googleapis.com/v1
    params: {
        key: "AIzaSyBmAhedqg2RCjmYTM86WhQOWw2l6eOM_n0"
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function logIn ({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserdata();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                case "INVALID_PASSWORD":
                    throw new Error("Email или пароль введены некорректно");

                default:
                    throw new Error(
                        "Слишком много попыток входа. Попробуйте позже"
                    );
                }
            }
        }
    }

    async function signUp ({ email, password, ...rest }) {
        const url = `accounts:signUp`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
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
    function logOut () {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    async function createUser (data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function editUser (data) {
        try {
            const { content } = await userService.updateUser(data);
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
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAcessToken()) {
            getUserdata();
        } else {
            setLoading(false);
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
        <AuthContext.Provider value={{ signUp, logIn, currentUser, logOut, editUser }}>
            { !isLoading ? children : "loading..." }
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;

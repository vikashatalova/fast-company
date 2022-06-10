import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profession, setProfession] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getProfessionsList () {
        try {
            const { content } = await professionService.get();
            setProfession(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getProfession (id) {
        return profession.find((p) => p._id === id);
    }
    return (
        <ProfessionContext.Provider value={{ isLoading, profession, getProfession }}>
            { children }
        </ProfessionContext.Provider>
    );
    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    }
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

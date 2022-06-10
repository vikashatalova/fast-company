import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import QualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher (error) {
        const { message } = error.response.data;
        // setError(message);
        console.log(message);
    }
    useEffect(() => {
        async function getQualities () {
            try {
                const { content } = await QualitiesService.get();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        }
        getQualities();
    }, []);
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };
    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
            {/* {!isLoading ? children : <h1>Qualities Loading....</h1>} */}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

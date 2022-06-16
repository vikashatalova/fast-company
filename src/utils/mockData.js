import { useEffect, useState } from "react";
import profession from "../mockData/professions.json";
import qulities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpServise from "../services/http.service";

const useMockData = () => {
    const statusConst = {
        idle: "Not started",
        pending: "In Process",
        sucess: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = profession.length + qulities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        };
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            statusConst(statusConst.sucess);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize () {
        try {
            for (const prof of profession) {
                await httpServise.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await httpServise.put("user/" + user._id, user);
                incrementCount();
            }
            for (const qual of qulities) {
                await httpServise.put("quality/" + qual._id, qual);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;

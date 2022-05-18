import React, { useState, useEffect } from "react";
import api from "../../../api/index";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    // const profession = (profession) => {
    //     return <span key={profession._id}>{profession.name}</span>;
    // };
    const history = useHistory();
    const handleSubmit = () => {
        history.push(history.location.pathname + "/edit");
    };
    return <>
        { user
            ? <div>
                <h1>Имя: {user.name}</h1>
                <p>Профессия: {user.profession.name}</p>
                <p>Качества: {<Qualities qualities={user.qualities}/>}</p>
                <p>Количество встреч: {user.completedMeetings}</p>
                <p>Оценка: {user.rate}</p>
                <button onClick={handleSubmit}>
                    Изменить
                </button>
            </div>
        : "loading..."}
    </>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;

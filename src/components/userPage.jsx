import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import userApi from "../api/fake.api/user.api";
import api from "../api/index";
import PropTypes from "prop-types";
import QualitestList from "./qualitestList";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const profession = (profession) => {
        return <span key={profession._id}>{profession.name}</span>;
    };
    const history = useHistory();
    const handleUsers = () => {
        history.replace("/users");
    };
    if (user) {
        return <>
            <div>
                <h1 className="btn-secondary">Имя: {user.name}</h1>
                <p>Профессия: {profession(user.profession)}</p>
                <p>Качества: {<QualitestList qualities={user.qualities}/>}</p>
                <p>Количество встреч: {user.completedMeetings}</p>
                <p>Оценка: {user.rate}</p>
                <button className="btn btn-primary" onClick={() => handleUsers()}>Все пользователи</button>
            </div>
        </>;
    } else {
        return null;
    }
};
UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;

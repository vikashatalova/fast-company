import React from "react";
import { useState } from "react";
import api from "../api";
import * as bootstrap from "bootstrap/dist/css/bootstrap.css";
import { logDOM } from "@testing-library/react";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        console.log(userId);
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    };
    const renderPharse = (number) => {
        if (number >= 1) {
            return <span className="badge rounded-pill bg-primary">{`${number} человек тусанет с тобой сегодня`}</span>
        }
        if (number < 1) {
            return <span className="badge rounded-pill bg-danger">{"Никто с тобой не тусанет"}</span>
        }
    };
    return (
        <>
        <h2>{renderPharse(users.length)}</h2>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Количество встреч</th>
                <th scope="col">Оценка</th>
                <th></th>
                </tr>
            </thead>
            <tbody className="table-secondary">
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.qualities.map((quality) => 
                            <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
                                {quality.name}
                            </span>)}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>Удалить</button></td>
                   </tr>
                ))}
            </tbody>
       </table>
       </>
    );
}

export default Users;
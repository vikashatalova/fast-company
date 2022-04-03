import React from "react";
import { useState } from "react";
import api from "../api";
import * as bootstrap from "bootstrap/dist/css/bootstrap.css";
import { logDOM } from "@testing-library/react";
import SearchStatus from "./searchStatus";
import User from "./user";


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        console.log(userId);
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    };
    
    return (
        <>
        <h2>{SearchStatus(users.length)}</h2>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Количество встреч</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th></th>
                </tr>
            </thead>
            <tbody className="table-secondary">
                {users.map((user) => (
                    <User user={user} onDelete={handleDelete}/>
                ))}
            </tbody>
       </table>
       </>
    );
}

export default Users;
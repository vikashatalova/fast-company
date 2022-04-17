import React, { useState, useEffect } from "react";
import api from "./api/index";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();
    console.log(api.users.fetchAll());
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    console.log(users);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };

    return (
        <>
            {users && <Users onDelete={handleDelete} users={users}/>}
        </>
    );
};

export default App;

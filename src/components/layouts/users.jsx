import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../userPage";
import UserList from "../userList";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage id={userId}/> : <UserList/>}
    </>;
};

export default Users;

// {userId ? <UserPage id={userId}/> : <UserList/>}

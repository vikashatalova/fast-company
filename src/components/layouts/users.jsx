import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UserList from "../page/usersListPage";
import EditUserPage from "../page/editPage/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return <>
        {userId ? (edit ? (<EditUserPage />) : <UserPage id={userId} />) : (<UserList />)}
    </>;
};

export default Users;

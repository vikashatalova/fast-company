import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UserList from "../page/usersListPage";
import EditUserPage from "../editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return <>
        {/* {userId ? <UserPage id={userId}/> : <UserList/>} */}
        {userId ? (edit ? (<EditUserPage usersId={userId}/>) : <UserPage id={userId} />) : (<UserList />)}
    </>;
};

export default Users;

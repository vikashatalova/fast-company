import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UserList from "../page/usersListPage";
import EditUserPage from "../page/editPage/editUserPage";
import UserProvider from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();
    return <>
        <UserProvider>
            {userId ? (edit ? userId === currentUser._id ? (<EditUserPage />) : (<Redirect to={`/users/${currentUser._id}/edit`}/>) : <UserPage id={userId} />) : (<UserList />)}
        </UserProvider>
    </>;
};

export default Users;

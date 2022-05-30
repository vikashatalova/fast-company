import React, { useState, useEffect } from "react";
import api from "../../../api/index";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetings from "../../ui/completedMeetings";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    return <>
        { user
            ? <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <CompletedMeetings value={user.completedMeetings} />
                        </div>

                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            </>

        : "loading..."}
    </>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;

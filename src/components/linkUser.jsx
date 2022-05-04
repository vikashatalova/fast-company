import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkUser = ({ user }) => {
    return (
        <Link to={`users/${user._id}`}>{user.name}</Link>
    );
};
LinkUser.propTypes = {
    user: PropTypes.object.isRequired
};

export default LinkUser;

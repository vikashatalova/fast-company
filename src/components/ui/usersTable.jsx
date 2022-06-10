import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({ onSort, users, onDelete, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя", component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
        qualities: { name: "Качество", component: (user) => <Qualities id={user.qualities}/> },
        professions: { name: "Профессия", component: (user) => <Profession id={user.profession}/> },
        completedMeetings: { path: "completedMeetings", name: "Количество встреч" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное", component: <Bookmark /> },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Удалить
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    onSort: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;

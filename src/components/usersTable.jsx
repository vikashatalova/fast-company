import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitestList from "./qualitestList";
import Table from "./table";

const UserTable = ({ onSort, users, onDelete, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качество", component: (user) => <QualitestList qualities={user.qualities}/> },
        professions: { path: "profession.name", name: "Профессия" },
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

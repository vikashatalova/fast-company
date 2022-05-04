import React, { useState, useEffect } from "react";
import api from "../api/index";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";

const UserList = () => {
    const [professions, setProfessions] = useState(api.professionsApi.fetchAll());
    const [selectedProf, setselectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();
    // получение данных ассинхронно
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };

    const handleProfessionsSelect = (item) => {
        setselectedProf(item);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    useEffect(() => {
        api.professionsApi.fetchAll().then((data) => setProfessions(data));
    }, [professions]);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const clearFilter = () => {
        setselectedProf();
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex ">
                {professions &&
                    <div className="d-flex flex-column flex-shrik-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionsSelect}
                            valueProperty="_id" contentProperty="name"
                        />
                        <button className="btn btn-secondary m-2"
                            onClick={clearFilter}>Очистить
                        </button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <h2><SearchStatus length={count}/></h2>
                    <UserTable
                        onSort={handleSort}
                        users={userCrop}
                        onDelete={handleDelete}
                        selectedSort={sortBy}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

export default UserList;

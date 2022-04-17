import React, { useState, useEffect } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import PropTypes from "prop-types";

const Users = ({ onDelete, users }) => {
    const [professions, setProfessions] = useState(api.professionsApi.fetchAll());
    const [selectedProf, setselectedProf] = useState();
    const pageSize = 4;

    const handleProfessionsSelect = (item) => {
        setselectedProf(item);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users;
    const count = filteredUsers.length;
    console.log(filteredUsers);
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    useEffect(() => {
        // api.prffessions.fetchAll().then((data) => setProfessions(data));
        api.professionsApi.fetchAll().then((data) => setProfessions(data));
    }, [professions]);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const clearFilter = () => {
        setselectedProf();
    };

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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Количество встреч</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-secondary">
                        {userCrop.map((user) => (
                            <User
                                user={user}
                                onDelete={onDelete}
                                key={user._id}
                            />
                        ))}
                    </tbody>
                </table>
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
};
Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default Users;

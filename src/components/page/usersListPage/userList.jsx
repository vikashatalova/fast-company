import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserList = () => {
    const [selectedProf, setselectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [value, setValue] = useState("");
    const pageSize = 8;
    const { isLoading: professionsLoading, profession } = useProfessions();
    const { users } = useUser();
    const { currentUser } = useAuth();

    const handleDelete = (userId) => {
        // setUsers((prevState) => prevState.filter((user) => user._id !== userId));
        console.log(userId);
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
    const handleChange = ({ target }) => {
        const { value } = target;
        clearFilter();
        setValue(value);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const clearFilter = () => setselectedProf();
    const clearValue = () => setValue("");
    const filteredValue = () => {
        if (value) {
            const filterUser = users.filter((user) => {
                return user.name.toLowerCase().includes(value.toLowerCase());
            });
            return filterUser;
        } else {
            // return users;
            return users.filter((u) => u._id !== currentUser._id);
        }
    };

    const search = filteredValue();
    if (users) {
        const filteredUsers = selectedProf
            ? search.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : search;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex ">
                {profession && !professionsLoading &&
                    <div className="d-flex flex-column flex-shrik-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={profession}
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
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder="Поиск по сайту"
                            className="form-control"
                            onChange={handleChange}
                            value={value}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={clearValue}
                        >
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
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

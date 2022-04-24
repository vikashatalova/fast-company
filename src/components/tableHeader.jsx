import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    // const up = <i className="bi bi-caret-up-fill"></i>;
    // const down = <i className="bi bi-caret-down-fill"></i>;
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const handleArrow = (item) => {
        if (selectedSort.path === item) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            }
            return <i className="bi bi-caret-up-fill"></i>;
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={ columns[column].path ? () => handleSort(columns[column].path) : undefined }
                        {...{ role: columns[column].path && "button" }}
                        scope="col">{columns[column].name}
                        { columns[column].path && handleArrow(columns[column].path) }
                    </th>
                ))};
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;

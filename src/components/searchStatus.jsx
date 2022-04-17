import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    if (length >= 1) {
        return (
            <span className="badge rounded-pill bg-primary">{`${length} человек тусанет с тобой сегодня`}</span>
        );
    }
    if (length < 1) {
        return (
            <span className="badge rounded-pill bg-danger">
                {"Никто с тобой не тусанет"}
            </span>
        );
    }
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;

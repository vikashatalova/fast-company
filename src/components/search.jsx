import React from "react";
import PropTypes from "prop-types";

const Search = ({ onChange }) => {
    return (
        <input
            type="search"
            name="q"
            placeholder="Поиск по сайту"
            className="form-control"
            onChange={onChange}
        />
    );
};
Search.propTypes = {
    onChange: PropTypes.func
};

export default Search;

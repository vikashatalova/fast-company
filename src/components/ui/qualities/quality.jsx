import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ quality }) => {
    return (
        quality.map((q) => {
            return (
                <span className={`badge m-1 bg-${q.color}` } key={q._id}>
                    {q.name}
                </span>
            );
        })
    );
};

Qualities.propTypes = {
    quality: PropTypes.array.isRequired
};

export default Qualities;

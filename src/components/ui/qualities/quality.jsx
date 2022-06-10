import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ quality }) => {
    console.log(quality);
    return (
        // <span className={"badge m-1 bg-" + color } key={_id}>
        //     {name}
        // </span>
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
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualities;

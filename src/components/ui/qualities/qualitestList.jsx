import React from "react";
import Qualities from "./quality";
import PropTypes from "prop-types";

const QualitestList = ({ qualities }) => {
    return <>
        { qualities.map((quality) =>
            <Qualities key={quality._id} {...quality}/>
        )}
    </>;
};
QualitestList.propTypes = {
    qualities: PropTypes.array
};

export default QualitestList;

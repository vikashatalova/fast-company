import React from "react";
import Qualities from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitestList = ({ userId }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = userId.map(q => getQuality(q));
    if (!isLoading) {
        return <Qualities key={qual._id} quality={qual}/>;
    } else return "loading...";
    // if (!isLoading) {
    //     return <>
    //         { qualities.map((qual) =>
    //             <Qualities key={qual._id} quality={getQuality(qual)}/>
    //         )}
    //     </>;
    // } else return "loading...";
};
QualitestList.propTypes = {
    userId: PropTypes.array.isRequired
};

export default QualitestList;

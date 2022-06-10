import React from "react";
import Qualities from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitestList = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = id.map(q => getQuality(q));
    console.log(qual);
    if (!isLoading) {
        return <Qualities quality={qual}/>;
    } else return "loading...";
    // return <>
    //     { qualities.map((quality) =>
    //         <Qualities key={quality._id} {...quality}/>
    //     )}
    // </>;
};
QualitestList.propTypes = {
    id: PropTypes.array.isRequired
};

export default QualitestList;

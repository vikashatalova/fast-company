import { useProfessions } from "../../hooks/useProfession";
import React from "react";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p key={prof._id}>{prof.name}</p>;
    } else return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

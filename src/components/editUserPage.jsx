import React, { useEffect, useState } from "react";
import TextField from "./common/form/textField";
import SelectField from "./common/form/selectField";
import RadioField from "./common/form/radio.Field";
import MultiSelectField from "./common/form/multiSelectField";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditUserPage = ({ usersId }) => {
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [profession, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const history = useHistory();
    const transformData = (data) => {
        return data.map((qual) => ({ name: qual.name, id: qual._id, color: qual.color }));
    };
    useEffect(() => {
        api.professionsApi.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualitiesApi.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.users.getById(usersId).then(({ profession, qualities, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }));
        });
    }, []);
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const getProfessionById = (id) => {
        for (const prof of profession) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        api.users.update(usersId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }).then((data) => history.push(`/users/${data._id}`));
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            name="profession"
                            options={profession}
                            onChange={handleChange}
                            value={data.profession}
                        />
                        <RadioField options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button type="submit" className="btn btn-primary w-100 mx-auto">Обновить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
EditUserPage.propTypes = {
    usersId: PropTypes.string.isRequired
};

export default EditUserPage;

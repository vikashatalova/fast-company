import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    // const { userId } = useParams();
    const { currentUser, editUser } = useAuth();
    const { profession } = useProfessions();
    const { qualities } = useQualities();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});
    const professions = profession.map((p) => ({ label: p.name, value: p._id }));
    console.log(professions);
    const allQualities = qualities.length > 0 ? (qualities.map((q) => ({ label: q.name, value: q._id }))) : [];
    // const [isLoading, setIsLoading] = useState(false);
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    // const getProfessionById = (id) => {
    //     for (const prof of profession) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };
    // const transformData = (data) => {
    //     return data.map((qual) => ({ label: qual.name, value: qual._id }));
    // };
    // useEffect(() => {
    //     setIsLoading(true);
    //     api.professionsApi.fetchAll().then((data) => {
    //         const professionsList = Object.keys(data).map((professionName) => ({
    //             label: data[professionName].name,
    //             value: data[professionName]._id
    //         }));
    //         setProfession(professionsList);
    //     });
    //     api.qualitiesApi.fetchAll().then((data) => {
    //         const qualitiesList = Object.keys(data).map((optionName) => ({
    //             label: data[optionName].name,
    //             value: data[optionName]._id,
    //             color: data[optionName].color
    //         }));
    //         setQualities(qualitiesList);
    //     });
    //     api.users.getById(userId).then(({ profession, qualities, ...data }) => {
    //         setData((prevState) => ({
    //             ...prevState,
    //             ...data,
    //             qualities: transformData(qualities),
    //             profession: profession._id
    //         }));
    //     });
    // }, []);
    // useEffect(() => {
    //     if (data._id) setIsLoading(false);
    // }, [data]);
    const transformData = (data) => {
        try {
            const quality = [];
            for (const qual of quality) {
                const q = data.find((q) => q._id === qual);
                quality.push(q);
            }
            return quality.map((qual) => ({ label: qual.name, value: qual._id }));
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [currentUser]);
    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ...currentUser,
            qualities: transformData(qualities),
            profession: profession
        }));
    }, []);
    const validate = () => {
        const errors = validator(currentUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const { qualities } = data;
        const isValid = validate();
        if (!isValid) return;
        editUser({
            ...data,
            qualities: getQualities(qualities)
        });
        history.push(`/users/${currentUser._id}`);
    };
    const getQualities = (elements) => {
        return elements.map(q => (q.value));
    };
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {qualities.length
? (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            name="profession"
                            options={professions}
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
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
                            options={allQualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                )
: (
                    "Loading..."
                )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;

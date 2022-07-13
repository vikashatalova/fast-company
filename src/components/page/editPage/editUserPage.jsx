import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
// import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    // const { userId } = useParams();
    const { currentUser, editUser } = useAuth();
    const { profession, isLoading: professionLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const [data, setData] = useState({
        email: currentUser.email,
        name: currentUser.name,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities
    });
    const [errors, setErrors] = useState({});
    const professions = profession.map((p) => ({ label: p.name, value: p._id }));
    const getQualities = (elements) => {
        return elements.map(q => (q.value));
    };
    const allQualities = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const [isLoading, setIsLoading] = useState();
    const transformData = (data) => {
        const quality = [];
        for (const qual of currentUser.qualities) {
            const q = data.find((q) => q._id === qual);
            quality.push(q);
        }
        return quality.map((qual) => ({ label: qual.name, value: qual._id }));
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
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData(() => ({
                ...currentUser,
                qualities: transformData(qualities)
            }));
            console.log(qualities);
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading();
        }
    }, [data]);
    useEffect(() => {
        if (data._id) {
            setIsLoading(false);
        }
    }, [data]);

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
    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => history.push(`/users/${currentUser._id}`)}>
                <i className="bi bi-caret-left"></i>
            Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!professionLoading && !qualitiesLoading
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
                            defaultValue={transformData(qualities)}
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

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { validateEmail } from "../../utils/helpers";
import useRegister from "./useRegister";

const Text = styled.p`
    font-size: 1.4rem;
    text-align: center;
    margin: 1rem 0;
`;
const TextLink = styled(Link)`
    font-size: 1.4rem;
    margin: 1rem 0;
    color: var(--color-blue-700);
`;

function RegisterForm() {
    const { isLoadingRegister, register } = useRegister();

    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        let errors = {};
        if (!inputValues.email) {
            errors.email = "Email is required";
        }
        if (inputValues.email && !validateEmail(inputValues.email)) {
            errors.email = "Email is not correct format";
        }
        if (!inputValues.password) {
            errors.password = "Password is required";
        }
        if (inputValues.password && inputValues.password.length < 8) {
            errors.password = "Password is too short";
        }
        if (!inputValues.passwordConfirm) {
            errors.passwordConfirm = "Confirm password is required";
        }
        if (
            inputValues.passwordConfirm &&
            inputValues.password !== inputValues.passwordConfirm
        ) {
            errors.passwordConfirm = "Confirm password is incorrect";
        }
        if (!inputValues.name.trim()) {
            errors.name = "Name is required";
        }
        return errors;
    };
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            register(inputFields, {
                onSettled: () => {
                    setInputFields({
                        ...inputFields,
                        password: "",
                        passwordConfirm: "",
                    });
                },
            });
        }
    }, [errors, submitting]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Name" error={errors?.name}>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    full-width
                    autoComplete="username"
                    value={inputFields.name}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical label="Email address" error={errors?.email}>
                <Input
                    type="text"
                    id="email"
                    name="email"
                    full-width
                    autoComplete="username"
                    value={inputFields.email}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical label="Password" error={errors?.password}>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    full-width
                    autoComplete="current-password"
                    value={inputFields.password}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical
                label="Confirm Password"
                error={errors?.passwordConfirm}
            >
                <Input
                    type="password"
                    id="confirm-password"
                    name="passwordConfirm"
                    full-width
                    autoComplete="current-confirm-password"
                    value={inputFields.passwordConfirm}
                    onChange={handleChange}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" style={{ marginTop: "0.8rem" }}>
                    {isLoadingRegister ? <SpinnerMini /> : "Register"}
                </Button>
            </FormRowVertical>
            <Text>
                Already have an account?
                <TextLink to="/login"> Sign in</TextLink>
            </Text>
        </Form>
    );
}

export default RegisterForm;

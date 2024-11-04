import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import useCreateStudent from "./useCreateStudent";
import useUpdateStudent from "./useUpdateStudent";

function StudentForm({ studentToEdit = {}, onCloseModal }) {
    let editId, editValues;

    if (Object.keys(studentToEdit).length) {
        editId = studentToEdit._id;
        editValues = {
            name: studentToEdit.name,
            phone: studentToEdit.phone,
            gender: studentToEdit.gender,
            dateOfBirth: format(
                new Date(studentToEdit.dateOfBirth),
                "yyyy-MM-dd"
            ),
            email: studentToEdit.user[0]?.email, // Get email from the first user object
        };
    }

    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isLoadingCreate, createStudent } = useCreateStudent();
    const { isLoadingUpdate, updateStudent } = useUpdateStudent();

    const isWorking = isLoadingCreate || isLoadingUpdate;
    function onSubmit(data) {
        if (isEditSession) {
            updateStudent(
                {
                    data: { ...data, userId: studentToEdit.user[0]?._id },
                    id: editId,
                },
                { onSuccess: () => onCloseModal?.() }
            );
        } else
            createStudent(
                { ...data },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors) {
        console.log(errors);
    }

    let genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        {
            value: "other",
            label: "Other",
        },
    ];

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Student name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                        pattern: {
                            value: /^(?!\s*$).+/,
                            message: "Please enter a valid name",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Phone" error={errors?.phone?.message}>
                <Input
                    type="phone"
                    id="phone"
                    {...register("phone", {
                        pattern: {
                            value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                            message: "Please enter a valid phone number",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Gender" error={errors?.gender?.message}>
                <Select
                    id="gender"
                    options={genderOptions}
                    style={{ width: "70%" }}
                    {...register("gender")}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Date Of Birth" error={errors?.dateOfBirth?.message}>
                <Input
                    type="date"
                    id="dateOfBirth"
                    {...register("dateOfBirth")}
                    disabled={isWorking}
                />
            </FormRow>

            {!isEditSession && (
                <FormRow
                    label="Password (min 8 characters)"
                    error={errors?.password?.message}
                >
                    <Input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Please enter a valid password at least 8 characters",
                            },
                        })}
                        disabled={isWorking}
                    />
                </FormRow>
            )}

            {!isEditSession && (
                <FormRow
                    label="Repeat password"
                    error={errors?.passwordConfirm?.message}
                >
                    <Input
                        type="password"
                        id="passwordConfirm"
                        {...register("passwordConfirm", {
                            required: "This field is required",
                            validate: (value) =>
                                value === getValues().password ||
                                "Passwords do not match",
                        })}
                        disabled={isWorking}
                    />
                </FormRow>
            )}

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit student" : "Create student"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default StudentForm;

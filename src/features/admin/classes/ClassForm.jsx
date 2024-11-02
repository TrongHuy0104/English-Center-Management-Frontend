import { useForm } from "react-hook-form";
// import { format } from "date-fns";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import Spinner from "../../../ui/Spinner";
import useCreateClass from "./useCreateClass";
import { format } from "date-fns";
import useUpdateClass from "./useUpdateClass";
import useTeachers from "./useTeachers";

function ClassForm({ classToEdit = {}, onCloseModal }) {
    const { isLoading: isLoadingTeachers, teachers } = useTeachers();

    let editId, editValues;

    if (Object.keys(classToEdit).length) {
        editId = classToEdit._id;
        editValues = {
            name: classToEdit.name,
            type: classToEdit.type,
            teacher: classToEdit.teacher._id,
            description: classToEdit.description,
            max_enrollment: classToEdit.max_enrollment,
            startDate: format(new Date(classToEdit.startDate), "yyyy-MM-dd"),
            endDate: format(new Date(classToEdit.endDate), "yyyy-MM-dd"),
            enrollment_deadline: format(
                new Date(classToEdit.enrollment_deadline),
                "yyyy-MM-dd"
            ),
        };
    }

    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isLoadingCreate, createClass } = useCreateClass();
    const { isLoadingUpdate, updateClass } = useUpdateClass();

    const isWorking = isLoadingCreate || isLoadingUpdate;
    function onSubmit(data) {
        if (isEditSession) {
            updateClass(
                {
                    data,
                    id: editId,
                },
                { onSuccess: () => onCloseModal?.() }
            );
        } else
            createClass(
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

    let typeOptions = [
        { value: "Level 1", label: "Level 1" },
        { value: "Level 2", label: "Level 2" },
        { value: "Level 3", label: "Level 3" },
        { value: "Level 4", label: "Level 4" },
        { value: "Level 5", label: "Level 5" },
        { value: "Level 6", label: "Level 6" },
        { value: "Level 7", label: "Level 7" },
    ];

    if (isLoadingTeachers) return <Spinner />;
    console.log("teachers", teachers);

    const filterTeachers = teachers
        .filter((teacher) => teacher.active)
        .map((teacher) => ({ value: teacher._id, label: teacher.name }));
    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Name" error={errors?.name?.message}>
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

            <FormRow label="Type" error={errors?.type?.message}>
                <Select
                    id="type"
                    options={typeOptions}
                    style={{ width: "70%" }}
                    {...register("type")}
                    disabled={isWorking}
                />
            </FormRow>
            <FormRow label="Teacher" error={errors?.teacher?.message}>
                <Select
                    id="teacher"
                    options={filterTeachers}
                    style={{ width: "70%" }}
                    {...register("teacher")}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Input
                    type="description"
                    id="description"
                    {...register("description", {
                        required: "This field is required",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Start Date" error={errors?.startDate?.message}>
                <Input
                    type="date"
                    id="startDate"
                    {...register("startDate", {
                        validate: {
                            notInThePast: (value) => {
                                const selectedDate = new Date(value);
                                const today = new Date();
                                // Set the time to midnight for accurate comparison
                                today.setHours(0, 0, 0, 0);
                                return (
                                    selectedDate >= today ||
                                    "Start date cannot be in the past"
                                );
                            },
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="End Date" error={errors?.endDate?.message}>
                <Input
                    type="date"
                    id="endDate"
                    {...register("endDate", {
                        validate: {
                            notEarlierThanStartDate: (value) => {
                                const startDate = getValues("startDate");
                                const endDate = new Date(value);
                                const start = new Date(startDate);

                                return (
                                    endDate >= start ||
                                    "End date cannot be earlier than start date"
                                );
                            },
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                label="Max Enrollment"
                error={errors?.max_enrollment?.message}
            >
                <Input
                    type="number"
                    id="max_enrollment"
                    {...register("max_enrollment", {
                        required: "Max enrollment is required",
                        validate: {
                            positiveNumber: (value) => {
                                return (
                                    value > 0 ||
                                    "Max enrollment must be greater than 0"
                                );
                            },
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                label="Enrollment Deadline"
                error={errors?.enrollment_deadline?.message}
            >
                <Input
                    type="date"
                    id="enrollment_deadline"
                    {...register("enrollment_deadline", {
                        validate: {
                            afterNow: (value) => {
                                const deadlineDate = new Date(value);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison
                                return (
                                    deadlineDate > today ||
                                    "Enrollment deadline must be after today"
                                );
                            },
                            beforeStartDate: (value) => {
                                const startDate = getValues("startDate");
                                const deadlineDate = new Date(value);
                                const start = new Date(startDate);
                                return (
                                    deadlineDate < start ||
                                    "Enrollment deadline must be before the start date"
                                );
                            },
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit class" : "Create class"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default ClassForm;

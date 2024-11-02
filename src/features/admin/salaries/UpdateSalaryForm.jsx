import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSalary, updateSalary } from "../../../services/apiSalary";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";
import useSalary from "./useSalary";

const StyledInput = styled(Input)`
    width: 450px;
    height: 40px;
`;

function UpdateSalaryForm({ salaryId, onCloseModal, onUpdate }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const { updateSalary } = useSalary();
    const [salaryData, setSalaryData] = useState(null);

    useEffect(() => {
        if (salaryId) {
            const fetchSalaryData = async () => {
                try {
                    const res = await getSalary(salaryId);
                    const salary = res.data.data.salary;

                    setSalaryData(salary);

                    setValue("salary_name", salary.salary_name || "");
                    setValue("price", salary.price || 0);
                    setValue("description", salary.description || "");
                } catch (error) {
                    console.error("Error fetching salary data:", error);
                }
            };
            fetchSalaryData();
        }
    }, [salaryId, setValue]);

    const onSubmitHandler = async (formData) => {
        try {
            updateSalary({ id: salaryId, ...formData });
            onCloseModal?.();
        } catch (error) {
            console.error("Error updating salary:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* Field Salary Name */}
            <FormRow label="Salary Name" error={errors?.salary_name?.message}>
                <StyledInput
                    type="text"
                    id="salary_name"
                    placeholder={salaryData?.salary_name || "Enter salary name"}
                    {...register("salary_name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* Field Price */}
            <FormRow label="Price" error={errors?.price?.message}>
                <StyledInput
                    type="number"
                    id="price"
                    placeholder={salaryData?.price || "Enter price"}
                    {...register("price", {
                        required: "This field is required",
                        min: { value: 1, message: "Price must be at least 1" },
                    })}
                />
            </FormRow>

            {/* Field Description */}
            <FormRow label="Description" error={errors?.description?.message}>
                <StyledInput
                    type="text"
                    id="description"
                    placeholder={salaryData?.description || "Enter description"}
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* Buttons */}
            <FormRow>
                <Button
                    variation="secondary"
                    type="button"
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <Button type="submit">Update Salary</Button>
            </FormRow>
        </form>
    );
}

export default UpdateSalaryForm;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSalary, updateSalary } from "../../../services/apiSalary.js";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";
import useSalary from "./useSalary";

const StyledInput = styled(Input)`
  width: 450px;
  height: 40px;
`;

// Wrapper for select container
const SelectWrapper = styled.div`
  position: relative;
  width: 450px;
`;

// Styled Select component
const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  -webkit-appearance: none; /* For Webkit browsers */
  -moz-appearance: none; /* For Firefox */
  appearance: none; /* Removes default arrow */

  /* Padding to make space for the arrow */
  padding-right: 40px;
`;

// Custom arrow using ::after pseudo-element
const Arrow = styled.div`
  content: "";
  position: absolute;
  pointer-events: none;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #555; /* Create downward pointing arrow */
`;

function AdminUpdateSalaryForm({ salaryId, onCloseModal, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { updateSalary } = useSalary();
  const [salaryData, setSalaryData] = useState();

  useEffect(() => {
    if (salaryId) {
      const fetchSalaryData = async () => {
        try {
          const res = await getSalary(salaryId);
          const salary = res.data.data.salaries;

          setSalaryData(salary);

          setValue("teacher_name", salary.teacher.name || "");
          setValue("month", salary.month || "");
          setValue("salary", salary.calculatedSalary || 0);
          setValue("shift", salary.shift || 0);
          setValue("shift_pay", salary.shift || 0);
          setValue("paid", salary.paid ? "true" : "false");
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
      {/* Field salary Name */}
      <FormRow label="Teacher Name" error={errors?.teacher?.name?.message}>
        <StyledInput
          type="text"
          id="teacher_name"
          placeholder={salaryData?.teacher?.name || "Enter teacher name"}
          {...register("teacher_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Field Description */}
      <FormRow label="Month" error={errors?.month?.message}>
        <StyledInput
          type="text"
          id="month"
          placeholder={salaryData?.month || "Enter month"}
          {...register("month", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Field Price */}
      <FormRow label="Salary" error={errors?.calculatedSalary?.message}>
        <StyledInput
          type="number"
          readOnly
          id="calculatedSalary"
          placeholder={salaryData?.calculatedSalary || "Enter price"}
          {...register("calculatedSalary", {
            required: "This field is required",
            min: { value: 1, message: "calculatedSalary must be at least 1" },
          })}
        />
      </FormRow>

      {/* Field status */}
      <FormRow label="Status">
        <SelectWrapper>
          <StyledSelect
            {...register("paid", { required: "This field is required" })}
          >
            <option value={true}>Paid</option>
            <option value={false}>Unpaid</option>
          </StyledSelect>
          <Arrow />
        </SelectWrapper>
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button variation="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit">Update Salary</Button>
      </FormRow>
    </form>
  );
}

export default AdminUpdateSalaryForm;

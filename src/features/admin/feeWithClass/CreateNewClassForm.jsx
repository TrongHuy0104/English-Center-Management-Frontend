import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import styled from "styled-components";
import useClass from "../classes/useClass";

const StyledInput = styled(Input)`
  width: 450px;
  height: 40px;
`;

const StyledSelect = styled.select`
  width: 450px;
  height: 40px;
`;

function CreateNewClassForm({ onCloseModal, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { classes, isLoading, error } = useClass();

  const classDropDown = classes?.data?.data;

  const onSubmitHandler = async (formData) => {
    try {
      await onSubmit(formData);
      onCloseModal?.();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label="Class Name" error={errors?.class_id?.message}>
        <StyledSelect
          {...register("class_id", { required: "This field is required" })}
        >
          <option value="">Select a class</option>
          {classDropDown?.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Due Date" error={errors?.due_date?.message}>
        <StyledInput
          type="date"
          id="due_date"
          {...register("due_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Create Date" error={errors?.create_date?.message}>
        <StyledInput
          type="date"
          id="create_date"
          {...register("create_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Status field with default value as 'not yet' */}
      <FormRow label="Status" error={errors?.status?.message}>
        <StyledSelect
          {...register("status", { required: "This field is required" })}
          defaultValue="not yet"
        >
          <option value="not yet">Not Yet</option>
          <option value="complete">Complete</option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" className="btn btn-primary">
          Create Class
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateNewClassForm;

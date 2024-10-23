import React from "react";
import { useForm } from "react-hook-form";
import useFee from "./useFee";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import styled from "styled-components";

const StyledInput = styled(Input)`
  width: 450px;
  height: 40px;
`;

function CreateNewFeeForm({ onCloseModal, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createFee, isLoading } = useFee();

  const onSubmitHandler = async (formData) => {
    try {
      await createFee(formData, {
        onSuccess: (data) => {
          onSubmit(data);
          onCloseModal?.();
        },
        onError: (error) => {
          console.error("Error creating fee:", error);
        },
      });
    } catch (error) {
      console.error("Error creating fee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label="Fee Name" error={errors?.fee_name?.message}>
        <StyledInput
          type="text"
          id="fee_name"
          placeholder="Enter fee name"
          {...register("fee_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <StyledInput
          type="number"
          id="price"
          placeholder="Enter price"
          {...register("price", {
            required: "This field is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <StyledInput
          type="text"
          id="description"
          placeholder="Enter description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Fee"}
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateNewFeeForm;

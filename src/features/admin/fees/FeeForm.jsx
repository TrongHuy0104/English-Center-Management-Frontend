import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFee, updateFee } from "../../../services/apiAuth"; // Import hàm API
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";

// Styled Components cho các trường input và select
const StyledInput = styled(Input)`
  width: 450px;
  height: 40px;
`;

const StyledSelect = styled.select`
  width: 450px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function FeeForm({ feeId, onCloseModal, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [feeData, setFeeData] = useState(null);

  useEffect(() => {
    if (feeId) {
      const fetchFeeData = async () => {
        try {
          const res = await getFee(feeId);
          const fee = res.data.data.data;
          console.log("dsadsadjasda", fee);

          setFeeData(fee);
          reset({
            amount: fee.amount || 0,
            due_date: fee.due_date ? fee.due_date.split("T")[0] : "",
            status: fee.paid ? "paid" : "unpaid",
            student_name: fee.student || "Unknown",
            contact: fee.contact || "No contact",
          });
        } catch (error) {
          console.error("Error fetching fee data:", error);
        }
      };
      fetchFeeData();
    }
  }, [feeId, reset]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log("Form data:", data); // In ra dữ liệu form để kiểm tra
    try {
      const response = await updateFee(feeId, data); // Gửi dữ liệu lên AP
      const updatedFee = response.data.data; // Nhận updatedFee từ API
      console.log("Updated Feeee:", response);
      console.log("Updated Fee:", updatedFee); // Kiểm tra xem updatedFee có dữ liệu không

      onUpdate(updatedFee);
      onCloseModal?.();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Student Name">
        <StyledInput
          type="text"
          id="student_name"
          value={feeData?.student || "Unknown"}
          readOnly
        />
      </FormRow>

      <FormRow label="Contact">
        <StyledInput
          type="text"
          id="contact"
          value={feeData?.contact || "No contact"}
          readOnly
        />
      </FormRow>

      <FormRow label="Amount" error={errors?.amount?.message}>
        <StyledInput
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Due Date" error={errors?.due_date?.message}>
        <StyledInput
          type="date"
          id="due_date"
          {...register("due_date", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <StyledSelect
          id="status"
          {...register("status", { required: "This field is required" })}
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit">Update Fee</Button>
      </FormRow>
    </form>
  );
}

export default FeeForm;

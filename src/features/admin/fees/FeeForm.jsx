// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { getFeeById, updateFee } from "../../../services/apiAuth"; // Use getFee API
// import styled from "styled-components";
// import Input from "../../../ui/Input";
// import Button from "../../../ui/Button";
// import FormRow from "../../../ui/FormRow";

// // Styled Components for inputs and select
// const StyledInput = styled(Input)`
//   width: 450px;
//   height: 40px;
// `;

// const StyledSelect = styled.select`
//   width: 450px;
//   height: 40px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// function FeeForm({ feeId, onCloseModal, onUpdate }) {
//   const { register, handleSubmit, reset, formState } = useForm();
//   const { errors } = formState;

//   // State to hold the fee data
//   const [isSumitting, setIsSubmitting] = useState(false);

//   // Fetch fee data using the getFee API function
//   useEffect(() => {
//     if (feeId) {
//       const fetchFeeData = async () => {
//         try {
//           const res = await getFeeById(feeId); // Use getFee from apiAuth
//           reset(res.data.data.fee); // Populate form with the fetched fee data
//         } catch (error) {
//           console.error("Error fetching fee data:", error);
//         }
//       };
//       fetchFeeData();
//     }
//   }, [feeId, reset]);

//   // Handle form submission for updating the fee
//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);
//       if (!feeId) throw new Error("Fee ID is undefined. Cannot update fee.");

//       // Log the data being sent and the feeId
//       console.log("Updating fee with ID:", feeId);
//       console.log("Data sent to update:", data);

//       const response = await updateFee(feeId, data); // Call the updateFee API
//       console.log("Update response:", response); // Log the response from the API

//       onCloseModal?.(); // Close the modal after update
//     } catch (error) {
//       console.error("Error updating fee:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <StyledForm onSubmit={handleSubmit(onSubmit)}>
//       <FormRow label="Amount" error={errors?.amount?.message}>
//         <StyledInput
//           type="number"
//           id="amount"
//           {...register("amount", {
//             required: "This field is required",
//             min: { value: 1, message: "Amount must be at least 1" },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Due Date" error={errors?.due_date?.message}>
//         <StyledInput
//           type="date"
//           id="due_date"
//           {...register("due_date", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Status" error={errors?.status?.message}>
//         <StyledSelect
//           id="status"
//           {...register("status", {
//             required: "This field is required",
//           })}
//         >
//           <option value="paid">Paid</option>
//           <option value="unpaid">Unpaid</option>
//           <option value="overdue">Overdue</option>
//         </StyledSelect>
//       </FormRow>

//       <FormRow>
//         <Button variation="secondary" type="button" onClick={onCloseModal}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Updating..." : "Update Fee"}
//         </Button>
//       </FormRow>
//     </StyledForm>
//   );
// }

// export default FeeForm;

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

function FeeForm({ feeId, onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  // State để lưu dữ liệu fee từ API
  const [feeData, setFeeData] = useState(null);

  // Khi feeId thay đổi, lấy dữ liệu fee từ API
  useEffect(() => {
    if (feeId) {
      const fetchFeeData = async () => {
        try {
          const res = await getFee(feeId);
          setFeeData(res.data.data.fee); // Lưu dữ liệu vào state
          reset(res.data.data.fee); // Đặt giá trị cho form
        } catch (error) {
          console.error("Error fetching fee data:", error);
        }
      };
      fetchFeeData();
    }
  }, [feeId, reset]);

  // Hàm submit để cập nhật fee
  const onSubmit = async (data) => {
    try {
      if (!feeId) {
        throw new Error("Fee ID is undefined. Cannot update fee.");
      }

      await updateFee(feeId, data); // Gửi dữ liệu lên API để cập nhật
      onCloseModal?.(); // Đóng modal sau khi lưu
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Form để hiển thị và chỉnh sửa dữ liệu fee
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("due_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <StyledSelect
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
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

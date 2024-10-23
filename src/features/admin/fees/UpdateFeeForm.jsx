import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFee, updateFee } from "../../../services/apiFee"; // Import hàm API
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";
import useFee from "./useFee";

// Styled Components cho các trường input và select
const StyledInput = styled(Input)`
  width: 450px;
  height: 40px;
`;

function UpdateFeeForm({ feeId, onCloseModal, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue, // Sử dụng setValue để gán giá trị cho input
    formState: { errors },
  } = useForm();
  const { updateFee } = useFee();
  const [feeData, setFeeData] = useState(null);

  // Lấy dữ liệu fee ban đầu từ API và thiết lập giá trị mặc định
  useEffect(() => {
    if (feeId) {
      const fetchFeeData = async () => {
        try {
          const res = await getFee(feeId);
          const fee = res.data.data.fee;

          console.log("fee1:", fee);
          console.log("feidđ", feeId);
          console.log("fee2:", res);

          setFeeData(fee);

          // Thiết lập giá trị mặc định cho các trường input
          setValue("fee_name", fee.fee_name || "");
          setValue("price", fee.price || 0);
          setValue("description", fee.description || "");
        } catch (error) {
          console.error("Error fetching fee data:", error);
        }
      };
      fetchFeeData();
    }
  }, [feeId, setValue]);

  // const onSubmitHandler = async (formData) => {
  //   console.log("Submitting data:", formData); // Kiểm tra dữ liệu trước khi gửi
  //   console.log("feidđ", feeId);
  //   try {
  //     updateFee(feeId, formData);
  //     onCloseModal?.();
  //   } catch (error) {
  //     console.error("Error updating fee:", error);
  //   }
  // };
  const onSubmitHandler = async (formData) => {
    console.log("Submitting data:", formData); // Kiểm tra dữ liệu trước khi gửi
    console.log("feidđ", feeId); // Kiểm tra lại `feeId`
    try {
      updateFee({ id: feeId, ...formData }); // Truyền `id` trong object
      onCloseModal?.();
    } catch (error) {
      console.error("Error updating fee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Field Fee Name */}
      <FormRow label="Fee Name" error={errors?.fee_name?.message}>
        <StyledInput
          type="text"
          id="fee_name"
          placeholder={feeData?.fee_name || "Enter fee name"} // Hiển thị giá trị hiện tại trong placeholder
          {...register("fee_name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Field Price */}
      <FormRow label="Price" error={errors?.price?.message}>
        <StyledInput
          type="number"
          id="price"
          placeholder={feeData?.price || "Enter price"} // Hiển thị giá trị hiện tại trong placeholder
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
          placeholder={feeData?.description || "Enter description"} // Hiển thị giá trị hiện tại trong placeholder
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        <Button variation="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit">Update Fee</Button>
      </FormRow>
    </form>
  );
}

export default UpdateFeeForm;

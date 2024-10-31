import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getFee, updateFee } from "../../../services/apiFee";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import styled from "styled-components";
import useFee from "./useFee";

const StyledInput = styled(Input)`
    width: 450px;
    height: 40px;
`;

function UpdateFeeForm({ feeId, onCloseModal, onUpdate }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const { updateFee } = useFee();
    const [feeData, setFeeData] = useState(null);

    useEffect(() => {
        if (feeId) {
            const fetchFeeData = async () => {
                try {
                    const res = await getFee(feeId);
                    const fee = res.data.data.fee;

                    setFeeData(fee);

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

    const onSubmitHandler = async (formData) => {
        try {
            updateFee({ id: feeId, ...formData });
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
                    placeholder={feeData?.fee_name || "Enter fee name"}
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
                    placeholder={feeData?.price || "Enter price"}
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
                    placeholder={feeData?.description || "Enter description"}
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
                <Button type="submit">Update Fee</Button>
            </FormRow>
        </form>
    );
}

export default UpdateFeeForm;

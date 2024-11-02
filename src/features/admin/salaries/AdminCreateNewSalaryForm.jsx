import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSalary from "./useSalary";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import styled from "styled-components";
import { getAllTeachers, getTeacher } from "../../../services/apiTeacher";
import { getTeacherAttendanceSummary } from "../../../services/apiAttendance";

const StyledInput = styled(Input)`
    width: 450px;
    height: 40px;
`;

const SelectWrapper = styled.div`
    position: relative;
    width: 450px;
`;

const StyledSelect = styled.select`
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
`;

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
    border-top: 6px solid #555;
`;

function AdminCreateNewSalaryForm({ onCloseModal, onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const { createSalary, isLoading } = useSalary();
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [shifts, setShifts] = useState(0);
    const [shiftPay, setShiftPay] = useState(0);
    const [calculatedSalary, setCalculatedSalary] = useState(0);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await getAllTeachers();

                setTeachers(res.data.data.data);
            } catch (error) {
                console.error("Error fetching teacher list:", error);
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        setCalculatedSalary(shifts * shiftPay);
    }, [shifts, shiftPay]);

    // Fetch số lượng buổi dạy khi giáo viên được chọn
    useEffect(() => {
        if (selectedTeacher) {
            const fetchShifts = async () => {
                try {
                    const now = new Date();

                    // Tạo startDay là ngày 1 của tháng hiện tại
                    const startDay = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        1
                    );

                    // Tạo endDay là ngày 1 của tháng kế tiếp
                    const endDay = new Date(
                        now.getFullYear(),
                        now.getMonth() + 1,
                        1
                    );

                    // Fetch dữ liệu buổi dạy cho giáo viên đã chọn
                    const shiftsData = await getTeacherAttendanceSummary(
                        selectedTeacher,
                        startDay.toISOString(),
                        endDay.toISOString()
                    );

                    setShifts(shiftsData.amount); // Cập nhật số buổi dạy

                    const teacherData = await getTeacher(selectedTeacher);

                    setShiftPay(teacherData.data.data.data.shiftPay);
                } catch (error) {
                    console.error(
                        "Error fetching teacher attendance summary:",
                        error
                    );
                }
            };
            fetchShifts();
        }
    }, [selectedTeacher]);

    const onSubmitHandler = async (formData) => {
        // Nếu không muốn gửi paymentDate, loại bỏ nó nếu không có giá trị
        const { paymentDate, ...restFormData } = formData;

        const modifiedFormData = {
            ...restFormData,
            teacher: formData.teacher_id, // Chuyển teacher_id thành teacher
            calculatedSalary,
            shifts,
            shiftPay,
        };
        try {
            await createSalary(
                modifiedFormData,

                {
                    onSuccess: (data) => {
                        onSubmit(data);
                        onCloseModal?.();
                    },
                    onError: (error) => {
                        console.error("Error creating Salary:", error);
                    },
                }
            );
        } catch (error) {
            console.error("Error creating Salary:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* Dropdown to select teacher */}
            <FormRow label="Teacher" error={errors?.teacher_id?.message}>
                <SelectWrapper>
                    <StyledSelect
                        id="teacher_id"
                        {...register("teacher_id", {
                            required: "This field is required",
                        })}
                        onChange={(e) => {
                            setSelectedTeacher(e.target.value); // Cập nhật selectedTeacher
                        }}
                    >
                        <option value="">Select a teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.name}
                            </option>
                        ))}
                    </StyledSelect>
                </SelectWrapper>
            </FormRow>

            {/* Field Month */}
            <FormRow label="Month" error={errors?.month?.message}>
                <StyledInput
                    type="string"
                    id="month"
                    placeholder={"Enter month"}
                    {...register("month", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* Hidden Field for Salary */}
            <input
                type="hidden"
                value={calculatedSalary}
                {...register("calculatedSalary")}
            />

            {/* Field status */}
            <FormRow label="Status">
                <SelectWrapper>
                    <StyledSelect
                        {...register("paid", {
                            required: "This field is required",
                        })}
                    >
                        <option value={false}>Unpaid</option>
                        <option value={true}>Paid</option>
                    </StyledSelect>
                    <Arrow />
                </SelectWrapper>
            </FormRow>

            {/* Shifts */}
            <FormRow label="Shifts" error={errors?.shifts?.message}>
                <StyledInput
                    type="number"
                    id="shifts"
                    value={shifts} // Hiển thị số ca nhưng không cho phép chỉnh sửa
                    readOnly
                />
            </FormRow>

            {/* <FormRow label="Shift Pay" error={errors?.shiftPay?.message}>
        <StyledInput
          type="number"
          id="shiftPay"
          placeholder={"Enter shift pay"}
          {...register("shiftPay", {
            required: "This field is required",
            min: { value: 1, message: "Shift pay must be at least 1" },
          })}
          onChange={(e) => setShiftPay(Number(e.target.value))}
        />
      </FormRow> */}
            {/* Shift Pay */}
            <FormRow label="Shift Pay" error={errors?.shiftPay?.message}>
                <StyledInput
                    type="number"
                    id="shiftPay"
                    value={shiftPay} // Hiển thị shiftPay từ bảng teachers
                    readOnly
                />
            </FormRow>
            <FormRow>
                <Button
                    variation="secondary"
                    type="button"
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Salary"}
                </Button>
            </FormRow>
        </form>
    );
}

export default AdminCreateNewSalaryForm;

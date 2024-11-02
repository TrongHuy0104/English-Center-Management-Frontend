import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table";
import toast from "react-hot-toast";

const ClassName = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
    // cursor: pointer;
    // &:hover {
    //   color: #4f46e5;
    // }
    transition: color 1s ease;

    /* Hover effect with animated gradient */
    &:hover {
        background: linear-gradient(45deg, #ff6ec4, #7873f5, #4caf50, #ffeb3b);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientMove 10s ease infinite;
    }

    @keyframes gradientMove {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function FeeRow({
    fee: { _id, classDetails, students, price, classes, fee_name },
}) {
    const navigate = useNavigate();

    const handleEventClick = () => {
        const classId = classInfo._id;
        if (!classId) return toast.error("No class found with that ID!");
        else {
            toast.success("Descripton for this class!");
        }
        navigate(`/students/classes/${classId}`);
    };

    // Extract class and student information
    const classInfo = classDetails?.[0] || {}; // Avoid null
    const className = classInfo?.name || "Class not found";
    const studentInfo = students?.[0] || {};
    const studentStatus = studentInfo?.status || "Status not found";
    const paymentDate = studentInfo?.payment_date
        ? format(new Date(studentInfo.payment_date), "MMM dd yyyy")
        : "Not paid";

    // Determine fee status
    const feeStatus =
        studentStatus === "paid"
            ? "paid"
            : new Date(classes?.[0]?.due_date) < new Date()
            ? "overdue"
            : "unpaid";

    const statusToTagName = {
        unpaid: "red",
        paid: "green",
        overdue: "yellow",
    };

    return (
        <Table.Row>
            <ClassName onClick={handleEventClick} style={{ cursor: "pointer" }}>
                {className}
            </ClassName>
            <Stacked>
                <span>{fee_name}</span>
            </Stacked>

            <Stacked>
                <span>
                    {classes?.[0]?.due_date
                        ? format(new Date(classes[0].due_date), "MMM dd yyyy")
                        : "No due date"}
                </span>
            </Stacked>

            <Tag type={statusToTagName[feeStatus]}>{feeStatus}</Tag>

            <Amount>${price}</Amount>

            <Stacked>
                <span>{paymentDate}</span>
            </Stacked>
        </Table.Row>
    );
}

export default FeeRow;

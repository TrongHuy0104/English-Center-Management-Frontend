import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import AdminUpdateSalaryForm from "./AdminUpdateSalaryForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteSalary } from "../../../services/apiSalary.js";
import Tag from "../../../ui/Tag";
import { useNavigate } from "react-router-dom";

const StudentName = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function AdminSalaryRow({ salary, onDelete, onUpdate }) {
    const { _id, teacher, calculatedSalary, paid, month } = salary;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteSalary(salary._id);
            onDelete(salary._id);
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setIsDeleting(false);
        }
    };
    // Hàm chọn màu cho status
    const status = paid ? "true" : "false";
    const statusToTagName = {
        false: "red",
        true: "green",
    };

    return (
        <Table.Row>
            <StudentName>{teacher.name || "Salary not found"}</StudentName>
            <p>{month}</p>
            <Amount>${calculatedSalary}</Amount>
            <Tag type={statusToTagName[status]}>
                {status === "true" ? "Paid" : "Unpaid"}
            </Tag>
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={salary._id} />
                        <Menus.List id={salary._id}>
                            <Modal.Open opens="delete-salary">
                                <Menus.Button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    icon={<HiTrash />}
                                >
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Window name="edit-salary">
                        <AdminUpdateSalaryForm
                            salaryId={salary._id}
                            onCloseModal={() => console.log("Modal closed")}
                            onUpdate={(updatedSalary) =>
                                onUpdate(updatedSalary)
                            } // Pass updated salary back to parent
                        />
                    </Modal.Window>

                    <Modal.Window name="delete-salary">
                        <ConfirmDelete
                            resourceName="salary"
                            onConfirm={handleDelete}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default AdminSalaryRow;

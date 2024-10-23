import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import SalaryForm from "./UpdateSalaryForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteSalary } from "../../../services/apiSalary";
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

function SalaryRow({
  salary: { _id, teacher, month, calculatedSalary, paid },
  onDelete,
  onUpdate,
}) {
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
  const getStatusColor = (paid) => {
    switch (paid) {
      case "true":
        return "green";
      case "fail":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <Table.Row>
      <StudentName>{teacher.name || "Salary not found"}</StudentName>
      <p>{salary.month}</p>
      <Amount>${salary.calculatedSalary}</Amount>
      <Tag type={getStatusColor(salary.paid)}>{salary.paid || "No status"}</Tag>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={salary._id} />
            <Menus.List id={salary._id}>
              <Menus.Button icon={<HiEye />} onClick={handleNavigate}>
                See Details
              </Menus.Button>

              <Modal.Open opens="edit-salary">
                <Menus.Button icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

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
            <SalaryForm
              SalaryId={salary._id}
              onCloseModal={() => console.log("Modal closed")}
              onUpdate={(updatedSalary) => onUpdate(updatedSalary)} // Pass updated Salary back to parent
            />
          </Modal.Window>

          <Modal.Window name="delete-salary">
            <ConfirmDelete resourceName="salary" onConfirm={handleDelete} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default SalaryRow;

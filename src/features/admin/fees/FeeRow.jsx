import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import FeeForm from "./FeeForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteFee } from "../../../services/apiAuth";
import Tag from "../../../ui/Tag";

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

function FeeRow({ fee, onDelete, onUpdate }) {
  const { _id, student, amount, due_date, paid } = fee;
  const [isDeleting, setIsDeleting] = useState(false);

  const status = paid
    ? "paid"
    : new Date(due_date) < new Date()
    ? "overdue"
    : "unpaid";
  const statusToTagName = {
    unpaid: "red",
    paid: "green",
    overdue: "yellow",
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFee(_id);
      onDelete(_id);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Table.Row>
      <StudentName>{student?.name || "Student not found"}</StudentName>
      <p>{student?.phone || "No phone"}</p>
      <p>Due Date: {due_date}</p>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Amount>${amount}</Amount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={_id} />
            <Menus.List id={_id}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => console.log(`View fee: ${_id}`)}
              >
                See Details
              </Menus.Button>

              <Modal.Open opens="edit-fee">
                <Menus.Button icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-fee">
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

          <Modal.Window name="edit-fee">
            <FeeForm
              feeId={_id}
              onCloseModal={() => console.log("Modal closed")}
              onUpdate={(updatedFee) => onUpdate(updatedFee)} // Pass updated fee back to parent
            />
          </Modal.Window>

          <Modal.Window name="delete-fee">
            <ConfirmDelete resourceName="fee" onConfirm={handleDelete} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default FeeRow;

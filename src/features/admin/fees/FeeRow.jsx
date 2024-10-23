import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import FeeForm from "./UpdateFeeForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteFee } from "../../../services/apiFee";
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

function FeeRow({ fee, onDelete, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFee(fee._id);
      onDelete(fee._id);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const navigate = useNavigate();

  // Hàm điều hướng đến trang chi tiết của phí
  const handleNavigate = () => {
    navigate(`/fees/${fee._id}`); // Điều hướng đến trang chi tiết phí với fee._id
  };

  return (
    <Table.Row>
      <StudentName>{fee.fee_name || "Fee not found"}</StudentName>
      {/* <Tag type={statusToTagName[status]}>{status}</Tag> */}
      <Amount>${fee.price}</Amount>
      <p>{fee.description}</p>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={fee._id} />
            <Menus.List id={fee._id}>
              <Menus.Button icon={<HiEye />} onClick={handleNavigate}>
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
              feeId={fee._id}
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

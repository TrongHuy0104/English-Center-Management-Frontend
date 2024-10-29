import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import FeeForm from "./UpdateFeeForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteFee } from "../../../services/apiFee";
import Tag from "../../../ui/Tag"; // Giả sử Tag đã có file sẵn từ /ui/Tag

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
  const classDetails = fee.classDetails?.flat() || [];
  const classes = fee.classes?.flat() || [];

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

  // Hàm chọn màu cho status
  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "green";
      case "not yet":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      {classDetails.map((classDetail, index) => {
        const classInfo = classes[index];

        return (
          <Table.Row key={classDetail._id}>
            <StudentName>{classDetail.name}</StudentName>
            <p>
              {classInfo?.due_date
                ? new Date(classInfo.due_date).toLocaleDateString()
                : "No due date"}
            </p>
            <Amount>${fee.price}</Amount>
            {/* Sử dụng component Tag để hiển thị status với màu dựa trên trạng thái */}
            <Tag type={getStatusColor(classInfo?.status)}>
              {classInfo?.status || "No status"}
            </Tag>
            <p>
              {classInfo?.create_date
                ? new Date(classInfo.create_date).toLocaleDateString()
                : "No due date"}
            </p>
            <div>
              <Modal>
                <Menus.Menu>
                  <Menus.Toggle id={fee._id} />
                  <Menus.List id={fee._id}>
                    <Menus.Button icon={<HiEye />}>See Details</Menus.Button>

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
              </Modal>
            </div>
          </Table.Row>
        );
      })}
    </>
  );
}

export default FeeRow;
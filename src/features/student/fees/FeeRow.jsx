import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";

const ClassName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
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
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  // Lấy thông tin của class từ classDetails
  const classInfo = classDetails?.[0] || {};  // Tránh lỗi null
  const className = classInfo?.name || "Class not found";

  // Lấy thông tin sinh viên và trạng thái thanh toán
  const studentInfo = students?.[0] || {};  // Tránh lỗi null
  const studentStatus = studentInfo?.status || "Status not found";

  // Lấy trạng thái thanh toán của học phí
  const feeStatus = studentStatus === "paid"
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
      {/* Hiển thị tên lớp */}
      <ClassName>{className}</ClassName>

      <Stacked>
        {/* Hiển thị tên học phí */}
        <span>{fee_name}</span>
      </Stacked>

      <Stacked>
        {/* Hiển thị ngày đến hạn */}
        <span>{format(new Date(classes?.[0]?.due_date), "MMM dd yyyy")}</span>
      </Stacked>

      {/* Hiển thị trạng thái thanh toán */}
      <Tag type={statusToTagName[feeStatus]}>{feeStatus}</Tag>

      {/* Hiển thị số tiền */}
      <Amount>${price}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={_id} />
          <Menus.List id={_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/fees/${_id}`)}
            >
              See Details
            </Menus.Button>
            <Menus.Button icon={<HiPencil />} onClick={() => onEdit(_id)}>
              Edit
            </Menus.Button>
            <Modal.Open opens="delete-fee">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete-fee">
          <ConfirmDelete resourceName="fee" onConfirm={() => onDelete(_id)} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default FeeRow;

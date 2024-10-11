// src/features/fees/FeeRow.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { getStudentById } from "../../../services/apiAuth";

import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";

const StudentName = styled.div`
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
  fee: { _id, student, amount, due_date, paid },
  onEdit,
  onDelete,
}) {
  const [studentData, setStudentData] = useState({
    name: "Loading...",
    email: "Loading...",
  });
  const navigate = useNavigate();

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
  useEffect(() => {
    async function fetchStudent() {
      const data = await getStudentById(student._id);
      console.log("Student data:", data); // Kiểm tra dữ liệu student
      if (data) {
        setStudentData({ name: data.name, email: data.email });
      } else {
        setStudentData({ name: "Unknown", email: "N/A" });
      }
    }
    fetchStudent();
  }, [student]);

  return (
    <Table.Row>
      <StudentName>{studentData.name}</StudentName>

      <Stacked>
        <span>{studentData.name}</span>
        <span>{studentData.email}</span>
      </Stacked>

      <Stacked>
        <span>Due Date: {format(new Date(due_date), "MMM dd yyyy")}</span>
        <span>Amount: ${amount}</span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status}</Tag>

      <Amount>${amount}</Amount>

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

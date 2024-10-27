import React from "react";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import Modal from "../../../ui/Modal";
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

function FeeRow({ fee, onDeleteClass, isDeleting }) {
  const classDetails = fee.classDetails?.flat() || [];
  const classes = fee.classes?.flat() || [];

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
            <Tag type={getStatusColor(classInfo?.status)}>
              {classInfo?.status || "No status"}
            </Tag>
            <p>
              {classInfo?.create_date
                ? new Date(classInfo.create_date).toLocaleDateString()
                : "No create date"}
            </p>
            <div></div>
            <div>
              <Modal>
                <Menus.Menu>
                  <Menus.Toggle id={fee._id} />
                  <Menus.List id={fee._id}>
                    <Menus.Button
                      onClick={() => {
                        console.log("Class ID to be deleted:", classInfo._id);
                        onDeleteClass(classInfo._id);
                      }}
                      disabled={isDeleting}
                      icon={<HiTrash />}
                    >
                      Delete
                    </Menus.Button>
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

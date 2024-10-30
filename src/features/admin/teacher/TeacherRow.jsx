import styled from "styled-components";

import { LiaSyncSolid } from "react-icons/lia";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Tag from "../../../ui/Tag";
import Menus from "../../../ui/Menus";
import TeacherForm from "./TeacherForm";
import useDisableTeacher from "./useDisableTeacher";
import Confirm from "../../../ui/Confirm";
import useEnableTeacher from "./useEnableTeacher";

const Teacher = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const StyledButton = styled.button`
  display: flex;
  margin-left: auto;
  background: none;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-700);
  }
`;

function TeacherRow({ teacher }) {
  const { id, name, phone, user, shiftPay, gender, classes } = teacher;
  const { email, active } = user[0];

  const { isLoadingDisable, disableTeacher } = useDisableTeacher();
  const { isLoadingEnable, enableTeacher } = useEnableTeacher();

  return (
    <>
      <Table.Row>
        <Teacher>{name}</Teacher>
        <p>{phone}</p>
        <p>{email}</p>

        <div style={{ paddingInline: 25 }}>
          <p>{shiftPay}</p>
        </div>
        <div>
          {classes && classes.length > 0 ? (
            <ul>
              {classes.map((classItem, index) => (
                <li key={index}>{classItem.name}</li> // Giả định classItem có thuộc tính "name"
              ))}
            </ul>
          ) : (
            <p>No classes</p>
          )}
        </div>

        <Tag type={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>

        <div>
          <Modal>
            {active && (
              <>
                <Menus.Menu>
                  <Menus.Toggle id={id} />
                  <Menus.List id={id}>
                    <Modal.Open opens="edit-form">
                      <Menus.Button icon={<HiOutlinePencilSquare />}>
                        Edit
                      </Menus.Button>
                    </Modal.Open>

                    <Modal.Open opens="delete-item">
                      <Menus.Button icon={<HiOutlineTrash />}>
                        Disable
                      </Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                </Menus.Menu>

                <Modal.Window name="edit-form">
                  <TeacherForm TeacherToEdit={teacher} />
                </Modal.Window>

                <Modal.Window name="delete-item">
                  <ConfirmDelete
                    resourceName="teacher"
                    disabled={isLoadingDisable}
                    onConfirm={() => disableTeacher(teacher.user[0]?._id)}
                  />
                </Modal.Window>
              </>
            )}
            {!active && (
              <>
                <Modal.Open opens="enable-item">
                  <StyledButton>
                    <LiaSyncSolid />
                  </StyledButton>
                </Modal.Open>
                <Modal.Window name="enable-item">
                  <Confirm
                    resourceName="teacher"
                    disabled={isLoadingEnable}
                    onConfirm={() => enableTeacher(teacher.user[0]?._id)}
                  />
                </Modal.Window>
              </>
            )}
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default TeacherRow;

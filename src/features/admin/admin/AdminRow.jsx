import styled from "styled-components";

import { LiaSyncSolid } from "react-icons/lia";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Tag from "../../../ui/Tag";
import Menus from "../../../ui/Menus";
import AdminForm from "./AdminForm";
import useDisableAdmin from "./useDisableAdmin";
import Confirm from "../../../ui/Confirm";
import useEnableAdmin from "./useEnableAdmin";

const Admin = styled.div`
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

function AdminRow({ admin }) {
    const { id, name, phone, user } = admin;
    const { email, active } = user[0];
    
    const { isLoadingDisable, disableAdmin } = useDisableAdmin();
    const { isLoadingEnable, enableAdmin } = useEnableAdmin();

    return (
        <>
            <Table.Row>
                <Admin>{name}</Admin>
                <p>{phone}</p>
                <p>{email}</p>
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
                                            <Menus.Button
                                                icon={<HiOutlinePencilSquare />}
                                            >
                                                Edit
                                            </Menus.Button>
                                        </Modal.Open>

                                        <Modal.Open opens="delete-item">
                                            <Menus.Button
                                                icon={<HiOutlineTrash />}
                                            >
                                                Disable
                                            </Menus.Button>
                                        </Modal.Open>
                                    </Menus.List>
                                </Menus.Menu>

                                <Modal.Window name="edit-form">
                                    <AdminForm adminToEdit={admin} />
                                </Modal.Window>

                                <Modal.Window name="delete-item">
                                    <ConfirmDelete
                                        resourceName="admin"
                                        disabled={isLoadingDisable}
                                        onConfirm={() =>
                                            disableAdmin(admin.user[0]?._id)
                                        }
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
                                        resourceName="admin"
                                        disabled={isLoadingEnable}
                                        onConfirm={() =>
                                            enableAdmin(admin.user[0]?._id)
                                        }
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

export default AdminRow;

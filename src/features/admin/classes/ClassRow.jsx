import styled from "styled-components";

import { FaRegEye } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import Modal from "../../../ui/Modal";
import Table from "../../../ui/Table";
import Tag from "../../../ui/Tag";
import Menus from "../../../ui/Menus";
import ClassForm from "./ClassForm";

const Title = styled.div`
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

const active = true;

function ClassRow({ item }) {
    const { _id, name, type, teacher, startDate, endDate } = item;
    const getStatus = () => {
        if (new Date(startDate) > Date.now()) return "not yet";
        if (new Date(startDate) <= Date.now() && new Date(endDate) > Date.now())
            return "active";
        return "finished";
    };

    const status = [
        {
            type: "not yet",
            color: "yellow",
        },
        {
            type: "active",
            color: "green",
        },
        {
            type: "finished",
            color: "red",
        },
    ];
    return (
        <>
            <Table.Row>
                <Title>{name}</Title>
                <p>{teacher?.name}</p>
                <p>{type}</p>
                <Tag
                    type={
                        status.find((item) => item.type === getStatus()).color
                    }
                >
                    {getStatus()}
                </Tag>
                <div>
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={_id} />
                            <Menus.List id={_id}>
                                <Modal.Open opens="edit-form">
                                    <Menus.Button
                                        icon={<HiOutlinePencilSquare />}
                                    >
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Menus.Button icon={<FaRegEye />}>
                                    Schedule
                                </Menus.Button>
                            </Menus.List>
                        </Menus.Menu>

                        <Modal.Window name="edit-form">
                            <ClassForm classToEdit={item} />
                        </Modal.Window>
                    </Modal>
                </div>
            </Table.Row>
        </>
    );
}

export default ClassRow;

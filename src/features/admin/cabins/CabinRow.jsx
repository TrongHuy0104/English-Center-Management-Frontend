import styled from "styled-components";

import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

// import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
// import useDeleteCabin from "./useDeleteCabin";
// import useCreateCabin from "./useCreateCabin";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";

// const TableRow = styled.div`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;
//     padding: 1.4rem 2.4rem;

//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }
// `;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

    // const queryClient = useQueryClient();

    // const { isPending: isDeleting, mutate } = useMutation({
    //     mutationFn: deleteCabin,
    //     onSuccess: () => {
    //         toast.success("Cabin successfully deleted");
    //         queryClient.invalidateQueries({
    //             queryKey: ["cabin"],
    //         });
    //     },
    //     onError: (err) => toast.error(err.message),
    // });
    // const { isDeleting, deleteCabin } = useDeleteCabin();
    // const { createCabin } = useCreateCabin();

    function handleDuplicate() {
        // createCabin({
        //     name: `Copy of ${name}`,
        //     maxCapacity,
        //     regularPrice,
        //     discount,
        //     image,
        // });
    }

    return (
        <>
            <Table.Row>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <p>First up to {maxCapacity} guests</p>
                <Price>{regularPrice}</Price>
                {discount ? (
                    <Discount>{discount}</Discount>
                ) : (
                    <span>&mdash;&mdash;&mdash;</span>
                )}
                <div>
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={id} />
                            <Menus.List id={id}>
                                <Menus.Button
                                    icon={<HiOutlineDocumentDuplicate />}
                                    onClick={handleDuplicate}
                                >
                                    Duplicate
                                </Menus.Button>

                                <Modal.Open opens="edit-form">
                                    <Menus.Button
                                        icon={<HiOutlinePencilSquare />}
                                    >
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens="delete-item">
                                    <Menus.Button icon={<HiOutlineTrash />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>
                        </Menus.Menu>

                        <Modal.Window name="edit-form">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete-item">
                            <ConfirmDelete
                                resourceName="cabin"
                                // disabled={isDeleting}
                                onConfirm={() => {}}
                            />
                        </Modal.Window>
                    </Modal>
                </div>
            </Table.Row>
        </>
    );
}

export default CabinRow;

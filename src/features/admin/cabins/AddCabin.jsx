import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    );
}

// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     const handleCloseModal = () => {
//         setIsOpenModal(!isOpenModal);
//     };
//     return (
//         <div>
//             <Button onClick={handleCloseModal}>Add New Cabin</Button>
//             {isOpenModal && (
//                 <Modal onClose={handleCloseModal}>
//                     <CreateCabinForm onCloseModal={handleCloseModal} />
//                 </Modal>
//             )}
//         </div>
//     );
// }

export default AddCabin;

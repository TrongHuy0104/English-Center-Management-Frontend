import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import ClassForm from "./ClassForm";

function AddClass() {
    return (
        <Modal>
            <Modal.Open opens="class-form">
                <Button>Add New Class</Button>
            </Modal.Open>
            <Modal.Window name="class-form">
                <ClassForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddClass;

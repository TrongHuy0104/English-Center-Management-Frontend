import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import StudentForm from "./StudentForm";
function AddStudent() {
    return (
        <Modal>
            <Modal.Open opens="student-form">
                <Button>Add New Student</Button>
            </Modal.Open>
            <Modal.Window name="student-form">
                <StudentForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddStudent;

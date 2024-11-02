import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import TeacherForm from "./TeacherForm";

function AddTeacher() {
  return (
    <Modal>
      <Modal.Open opens="teacher-form">
        <Button>Add New Teacher</Button>
      </Modal.Open>
      <Modal.Window name="teacher-form">
        <TeacherForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddTeacher;

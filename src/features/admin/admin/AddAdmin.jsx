import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AdminForm from "./AdminForm";

function AddTeacher() {
  return (
    <Modal>
      <Modal.Open opens="admin-form">
        <Button>Add New Teacher</Button>
      </Modal.Open>
      <Modal.Window name="admin-form">
        <AdminForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddTeacher;

import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import AdminForm from "./AdminForm";

function AddAdmin() {
    return (
        <Modal>
            <Modal.Open opens="admin-form">
                <Button>Add New Admin</Button>
            </Modal.Open>
            <Modal.Window name="admin-form">
                <AdminForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddAdmin;

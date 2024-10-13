// import React, { useState } from "react";
// import styled from "styled-components";
// import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
// import FeeForm from "./FeeForm";
// import Modal from "../../../ui/Modal";
// import ConfirmDelete from "../../../ui/ConfirmDelete";
// import Table from "../../../ui/Table";
// import Menus from "../../../ui/Menus";
// import { deleteFee } from "../../../services/apiAuth";
// import { updateFee } from "../../../services/apiAuth";

// // Styled components
// const StudentName = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Amount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
// `;

// function FeeRow({ fee, onDelete, onUpdate }) {
//   const { _id, student, amount, due_date, paid } = fee;
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     setIsDeleting(true); // Hiển thị trạng thái xóa
//     try {
//       console.log("Delete fee:", fee._id);
//       const response = await deleteFee(_id); // Gọi API xóa
//       console.log("Delete response:", response); // Gọi API để xóa fee
//       onDelete(fee._id); // Cập nhật danh sách sau khi xóa
//     } catch (error) {
//       console.log("Delete error:", error);
//     } finally {
//       setIsDeleting(false); // Ẩn trạng thái xóa
//     }
//   };

//   // Handle update
//   const handleUpdate = async (updatedFeeData) => {
//     setIsEditing(true);
//     try {
//       const response = await updateFee(_id, updatedFeeData); // Call API to update fee
//       onUpdate(response.data.data.fee); // Call onUpdate function passed from FeeTable with updated fee data
//     } catch (error) {
//       console.error("Update error:", error);
//     } finally {
//       setIsEditing(false);
//     }
//   };

//   return (
//     <>
//       <Table.Row>
//         <StudentName>{student?.name || "Student not found"}</StudentName>
//         <p>{student?.phone || "No phone"}</p>
//         <p>Due Date: {due_date}</p>
//         <Amount>${amount}</Amount>
//         <div>
//           <Modal>
//             <Menus.Menu>
//               <Menus.Toggle id={_id} />
//               <Menus.List id={_id}>
//                 <Menus.Button
//                   icon={<HiEye />}
//                   onClick={() => console.log(`View fee: ${_id}`)}
//                 >
//                   See Details
//                 </Menus.Button>

//                 <Modal.Open opens="edit-fee">
//                   <Menus.Button icon={<HiOutlinePencilSquare />}>
//                     Edit
//                   </Menus.Button>
//                 </Modal.Open>

//                 <Modal.Open opens="delete-fee">
//                   <Menus.Button
//                     onConfirm={handleDelete}
//                     disabled={isDeleting}
//                     icon={<HiTrash />}
//                   >
//                     Delete
//                   </Menus.Button>
//                 </Modal.Open>
//               </Menus.List>
//             </Menus.Menu>

//             <Modal.Window name="edit-fee">
//               <FeeForm
//                 feeToEdit={fee}
//                 onCloseModal={() => setIsEditing(false)}
//                 onSave={handleUpdate}
//               />
//             </Modal.Window>

//             <Modal.Window name="delete-fee">
//               <ConfirmDelete resourceName="fee" onConfirm={handleDelete} />
//             </Modal.Window>
//           </Modal>
//         </div>
//       </Table.Row>
//     </>
//   );
// }

// export default FeeRow;

import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare, HiTrash, HiEye } from "react-icons/hi2";
import FeeForm from "./FeeForm";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Table from "../../../ui/Table";
import Menus from "../../../ui/Menus";
import { deleteFee } from "../../../services/apiAuth";
import Tag from "../../../ui/Tag";

const StudentName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function FeeRow({ fee, onDelete, onUpdate }) {
  const { _id, student, amount, due_date, paid } = fee;
  const [isDeleting, setIsDeleting] = useState(false);

  const status = paid
    ? "paid"
    : new Date(due_date) < new Date()
    ? "overdue"
    : "unpaid";
  const statusToTagName = {
    unpaid: "red",
    paid: "green",
    overdue: "yellow",
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFee(_id); // Gọi API để xóa fee
      onDelete(_id); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Table.Row>
        <StudentName>{student?.name || "Student not found"}</StudentName>
        <p>{student?.phone || "No phone"}</p>
        <p>Due Date: {due_date}</p>
        <Tag type={statusToTagName[status]}>{status}</Tag>
        <Amount>${amount}</Amount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={_id} />
              <Menus.List id={_id}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => console.log(`View fee: ${_id}`)}
                >
                  See Details
                </Menus.Button>

                <Modal.Open opens="edit-fee">
                  <Menus.Button icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete-fee">
                  <Menus.Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    icon={<HiTrash />}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-fee">
              <FeeForm feeId={_id} onCloseModal={() => onUpdate()} />
            </Modal.Window>

            <Modal.Window name="delete-fee">
              <ConfirmDelete resourceName="fee" onConfirm={handleDelete} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default FeeRow;

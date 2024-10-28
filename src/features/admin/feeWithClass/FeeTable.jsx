// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import useFeeWithClass from "./useFeeWithClass";
// import Spinner from "../../../ui/Spinner";
// import Empty from "../../../ui/Empty";
// import Menus from "../../../ui/Menus";
// import Table from "../../../ui/Table";
// import Button from "../../../ui/Button";
// import Pagination from "../../../ui/Pagination";
// import FeeRow from "./FeeRow"; // Import FeeRow component
// import { useParams } from "react-router-dom";

// import CreateNewFeeForm from "./CreateNewFeeForm";
// import Modal from "../../../ui/Modal";
// import { CreateFee } from "../../../services/apiFee";

// const StyledButton = styled(Button)`
//   color: white;
//   background-color: #4f46e5;
//   padding: 8px 16px;
//   font-size: 14px;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #4338ca;
//   }

//   margin-left: auto;
//   display: block;
// `;

// function FeeTable() {
//   const { feeId } = useParams();
//   const { isLoading, feeDetail: initialFees, error } = useFeeWithClass(feeId);
//   const [fees, setFees] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   useEffect(() => {
//     if (initialFees && !Array.isArray(initialFees)) {
//       setFees([initialFees]);
//     } else if (Array.isArray(initialFees)) {
//       setFees(initialFees);
//     }
//   }, [initialFees]);

//   const handleCreateFee = async (newFeeData) => {
//     try {
//       const response = await CreateFee(newFeeData);

//       if (response?.data?.data) {
//         setFees((prevFees) => [...prevFees, response.data.data]);
//         setShowModal(false);
//       } else {
//         console.error("Failed to create fee: No data returned from server");
//       }
//     } catch (error) {
//       console.error(
//         "Error creating fee:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   const toggleModal = () => setShowModal(!showModal);
//   if (isLoading) return <Spinner />;
//   if (error) return <p>Error loading fees: {error.message}</p>;
//   if (!fees.length) return <Empty resource="fees" />;

//   return (
//     <Menus>
//       <Modal>
//         <Modal.Open opens="create-fee">
//           <StyledButton onClick={toggleModal}>Create New Fee</StyledButton>
//         </Modal.Open>

//         <Modal.Window name="create-fee">
//           <CreateNewFeeForm
//             onSubmit={handleCreateFee}
//             onCloseModal={toggleModal}
//           />
//         </Modal.Window>
//       </Modal>
//       <Table columns="1.6fr 1.6fr 1.6fr 1.6fr 1.6fr 0.1fr 3.2rem">
//         <Table.Header>
//           <div>Class</div>
//           <div>Due Date</div>
//           <div>Price</div>
//           <div>Status</div>
//           <div>Create Date</div>
//           <div></div>
//         </Table.Header>

//         <Table.Body
//           data={fees}
//           render={(fee) => <FeeRow key={fee._id} fee={fee} />}
//         />
//       </Table>

//       <Table.Footer>
//         <Pagination count={fees.length} />
//       </Table.Footer>
//     </Menus>
//   );
// }

// export default FeeTable;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFeeWithClass from "./useFeeWithClass";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Button from "../../../ui/Button";
import Pagination from "../../../ui/Pagination";
import FeeRow from "./FeeRow"; // Import FeeRow component
import { useParams } from "react-router-dom";

import CreateNewClassForm from "./CreateNewClassForm"; // Đổi từ CreateNewFeeForm sang CreateNewClassForm
import Modal from "../../../ui/Modal";
// import { createClassInFee, deleteClassInFee } from "../../../services/apiFee";
import { useQueryClient } from "@tanstack/react-query";

const StyledButton = styled(Button)`
  color: white;
  background-color: #4f46e5;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }

  margin-left: auto;
  display: block;
`;

function FeeTable() {
  const { feeId } = useParams();
  const {
    isLoading,
    feeDetail: initialFees,
    error,
    handleDeleteClass,
    isDeleting,
    createClass,
  } = useFeeWithClass(feeId);
  const [fees, setFees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialFees && !Array.isArray(initialFees)) {
      setFees([initialFees]);
    } else if (Array.isArray(initialFees)) {
      setFees(initialFees);
    }
  }, [initialFees]);

  console.log("initialFees", initialFees);

  // const handleCreateFee = async (newClassData) => {
  //   try {
  //     const response = await createClassInFee(feeId, newClassData);

  //     if (response?.status === 400) {
  //       alert("This class already exists in the fee");
  //       return;
  //     }

  //     if (response?.data?.data) {
  //       // Cập nhật fees với lớp học vừa được tạo
  //       const updatedClass = response.data.data.classes.at(-1); // Lấy lớp học mới nhất vừa được thêm vào

  //       // Cập nhật state của fees để hiển thị ngay lớp học mới
  //       setFees((prevFees) =>
  //         prevFees.map((fee) =>
  //           fee._id === feeId
  //             ? { ...fee, classes: [...fee.classes, updatedClass] } // Thêm lớp học mới vào danh sách classes của fee
  //             : fee
  //         )
  //       );

  //       setShowModal(false);
  //       // Refetch lại dữ liệu từ API để đảm bảo đồng bộ
  //       await queryClient.invalidateQueries("feeDetail");
  //     } else {
  //       console.error("Failed to create fee: No data returned from server");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error creating fee:",
  //       error.response?.data || error.message
  //     );
  //     if (error.response?.status === 400) {
  //       alert("This class already exists in the fee");
  //     }
  //   }
  // };

  const handleCreateFee = async (newClassData) => {
    try {
      createClass(newClassData); // Use the createClass function from useFeeWithClass
    } catch (error) {
      console.error("Error creating fee:", error.message);
    }
  };
  const toggleModal = () => setShowModal(!showModal);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees.length) return <Empty resource="fees" />;

  return (
    <Menus>
      <Modal>
        <Modal.Open opens="create-class">
          <StyledButton onClick={toggleModal}>Create New Class</StyledButton>
        </Modal.Open>

        <Modal.Window name="create-class">
          <CreateNewClassForm
            onSubmit={handleCreateFee}
            onCloseModal={toggleModal}
          />
        </Modal.Window>
      </Modal>

      <Table columns="1.6fr 1.6fr 1.6fr 1.6fr 1.6fr 0.1fr 3.2rem">
        <Table.Header>
          <div>Class</div>
          <div>Due Date</div>
          <div>Price</div>
          <div>Status</div>
          <div>Create Date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees}
          render={(fee) => (
            <FeeRow
              key={fee._id}
              fee={fee}
              onDeleteClass={handleDeleteClass}
              isDeleting={isDeleting}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default FeeTable;

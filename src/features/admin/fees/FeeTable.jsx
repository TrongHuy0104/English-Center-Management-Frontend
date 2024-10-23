import FeeRow from "./FeeRow";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFee from "./useFee";
import CreateNewFeeForm from "./CreateNewFeeForm"; // Form để tạo fee mới
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal"; // Giả sử bạn có sẵn component Modal'
import { CreateFee } from "../../../services/apiFee";

const StyledButton = styled(Button)`
  color: white;
  background-color: #4f46e5;
  padding: 8px 16px; /* Giảm kích thước nút */
  font-size: 14px; /* Giảm kích thước chữ */
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
  const { isLoading, fees: initialFees, error } = useFee(); // Fetch all fees từ custom hook
  const [fees, setFees] = useState([]); // Quản lý danh sách fees
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

  useEffect(() => {
    if (initialFees && Array.isArray(initialFees)) {
      setFees(initialFees); // Cập nhật danh sách fees từ API
    }
  }, [initialFees]);
  console.log("initialFees: ", initialFees);

  // Hàm cập nhật fee trong danh sách sau khi gọi API
  const handleUpdateFee = (updatedFee) => {
    setFees((prevFees) =>
      prevFees.map((fee) => (fee._id === updatedFee._id ? updatedFee : fee))
    );
  };

  // Hàm xóa fee khỏi danh sách
  const handleDeleteFee = async (id) => {
    setFees((prevFees) => prevFees.filter((fee) => fee._id !== id));
  };

  // Hàm tạo fee mới
  const handleCreateFee = async (newFeeData) => {
    try {
      // Gọi API để tạo fee mới
      const response = await CreateFee(newFeeData);

      if (response?.data?.data) {
        // Thêm fee mới vào danh sách mà không cần tải lại trang
        setFees((prevFees) => [...prevFees, response.data.data]);
        // console.log("initialFeesaaa: ", ...prevFees, response.data.data);

        // Đóng modal sau khi tạo thành công
        setShowModal(false);
      } else {
        console.error("Failed to create fee: No data returned from server");
      }
    } catch (error) {
      // Thêm thông tin chi tiết về lỗi để dễ debug hơn
      console.error(
        "Error creating fee:",
        error.response?.data || error.message
      );
    }
  };

  const toggleModal = () => setShowModal(!showModal); // Toggle modal
  console.log("initialFeesssss: ", fees);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees?.length) return <Empty resource="fees" />;

  console.log("toggleModal: ", toggleModal, "modal: ", showModal);

  return (
    <Menus>
      {/* Nút mở modal tạo fee mới */}
      <Modal>
        <Modal.Open opens="create-fee">
          <StyledButton onClick={toggleModal}>Create New Fee</StyledButton>
        </Modal.Open>

        <Modal.Window name="create-fee">
          <CreateNewFeeForm
            onSubmit={handleCreateFee} // Pass callback để cập nhật danh sách phí
            onCloseModal={toggleModal}
          />
        </Modal.Window>
      </Modal>

      <Table columns="2.5fr 2.5fr 3fr 0.5fr 3.2rem">
        <Table.Header>
          <div>Fee Type</div>
          <div>Price</div>
          <div>Description</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees}
          render={(fee) => (
            <FeeRow
              key={fee._id}
              fee={fee}
              onDelete={(e) => handleDeleteFee(fee._id)}
              onUpdate={handleUpdateFee}
            />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={fees.length} />
      </Table.Footer>
    </Menus>
  );
}

export default FeeTable;

//tên fee, tên lớp, bảng phí ban đầu sẽ là viewdetail
//trang 1 : tên phí , giá , description
//trang 2: dsach lớp, dua_date, giá, status: complete or not, ngày tạo
//trang3: dsach hs(link), dua_date, giá,(status: unpaid, overdate, paid)

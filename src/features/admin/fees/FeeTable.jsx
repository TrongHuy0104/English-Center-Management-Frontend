import React, { useState, useEffect } from "react";
import FeeRow from "./FeeRow";
import styled from "styled-components";
import useFee from "./useFee";
import CreateNewFeeForm from "./CreateNewFeeForm";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { CreateFee, deleteFee } from "../../../services/apiFee";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 10; // Số mục hiển thị trên mỗi trang

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
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const queryClient = useQueryClient();

  const {
    isLoading,
    fees: initialFees,
    error,
    totalPages,
  } = useFee(currentPage, PAGE_SIZE);
  const [fees, setFees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (initialFees && Array.isArray(initialFees.fees)) {
      setFees(initialFees.fees);
    }
  }, [initialFees, currentPage]);

  const handleUpdateFee = (updatedFee) => {
    setFees((prevFees) =>
      prevFees.map((fee) => (fee._id === updatedFee._id ? updatedFee : fee))
    );
  };

  const handleDeleteFee = async (id) => {
    try {
      await deleteFee(id); // Gọi API xóa
      setFees((prevFees) => prevFees.filter((fee) => fee._id !== id));
      queryClient.invalidateQueries(["fees"]);
    } catch (error) {
      console.error("Error deleting salary:", error);
    }
  };

  const handleCreateFee = async (newFeeData) => {
    try {
      const response = await CreateFee(newFeeData);

      if (response?.data?.data) {
        setFees((prevFees) => [...prevFees, response.data.data]);
        setShowModal(false);
      } else {
        console.error("Failed to create fee: No data returned from server");
      }
    } catch (error) {
      console.error(
        "Error creating fee:",
        error.response?.data || error.message
      );
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees?.length) return <Empty resource="fees" />;

  return (
    <Menus>
      <Modal>
        <Modal.Open opens="create-fee">
          <StyledButton onClick={toggleModal}>Create New Fee</StyledButton>
        </Modal.Open>

        <Modal.Window name="create-fee">
          <CreateNewFeeForm
            onSubmit={handleCreateFee}
            onCloseModal={toggleModal}
          />
        </Modal.Window>
      </Modal>

      <Table columns="2.0fr 2.0fr 4fr 0.1fr 2.5rem">
        <Table.Header>
          <div>Fee Type</div>
          <div>Price</div>
          <div>Description</div>
          <div></div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees} // Dùng các mục trong trang hiện tại
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
        <Pagination
          count={initialFees?.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage} // Thêm logic thay đổi trang
          total={initialFees?.total}
        />
      </Table.Footer>
    </Menus>
  );
}

export default FeeTable;

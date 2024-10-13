import React, { useState, useEffect } from "react";
import FeeRow from "./FeeRow";
import useFee from "./useFee"; // Hook để lấy dữ liệu từ API
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";

function FeeTable() {
  const { isLoading, fees: initialFees, error } = useFee(); // Fetch all fees from custom hook
  const [fees, setFees] = useState([]); // State lưu dữ liệu fees

  useEffect(() => {
    if (initialFees) {
      setFees(initialFees); // Gán dữ liệu ban đầu
    }
  }, [initialFees]);

  // Hàm để cập nhật dữ liệu fee sau khi cập nhật thành công
  const handleUpdateFee = (updatedFee) => {
    setFees((prevFees) =>
      prevFees.map((fee) => (fee._id === updatedFee._id ? updatedFee : fee))
    );
  };

  const handleDeleteFee = async (id) => {
    setFees((prevFees) => prevFees.filter((fee) => fee._id !== id));
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees.length) return <Empty resource="fees" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Student Name</div>
          <div>Contact</div>
          <div>Details</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees}
          render={(fee) => (
            <FeeRow
              key={fee._id}
              fee={fee}
              onDelete={handleDeleteFee}
              onUpdate={handleUpdateFee} // Truyền callback handleUpdateFee
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

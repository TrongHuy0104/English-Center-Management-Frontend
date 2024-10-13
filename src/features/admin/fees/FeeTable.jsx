// export default FeeTable;
import FeeRow from "./FeeRow";
// import useBookings from "./useBookings";
import React, { useState, useEffect } from "react";

import useFee from "./useFee";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";

function FeeTable() {
  const { isLoading, fees: initialFees, error } = useFee(); // Fetch all fees from the custom hook
  const [fees, setFees] = useState([]); // Declare a state for managing fees

  console.log(initialFees);

  // Use the initial fees from the API when they are available
  useEffect(() => {
    if (initialFees) {
      setFees(initialFees); // Set the initial fees from the API call
    }
  }, [initialFees]);

  // Function to handle updating in the frontend after API call
  const handleUpdateFee = (updatedFee) => {
    setFees((prevFees) =>
      prevFees.map((fee) => (fee._id === updatedFee._id ? updatedFee : fee))
    );
  };

  const handleDeleteFee = async (id) => {
    // Filter out the deleted fee from the list
    setFees((prevFees) => prevFees.filter((fee) => fee._id !== id));
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees?.length) return <Empty resource="fees" />;

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

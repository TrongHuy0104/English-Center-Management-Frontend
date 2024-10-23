import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFeeWithClass from "./useFeeWithClass";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import FeeRow from "./FeeRow"; // Import FeeRow component
import { useParams } from "react-router-dom";

function FeeTable() {
  const { feeId } = useParams();
  const { isLoading, feeDetail: initialFees, error } = useFeeWithClass(feeId);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    if (initialFees && !Array.isArray(initialFees)) {
      setFees([initialFees]);
    } else if (Array.isArray(initialFees)) {
      setFees(initialFees);
    }
  }, [initialFees]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading fees: {error.message}</p>;
  if (!fees.length) return <Empty resource="fees" />;

  return (
    <Menus>
      <Table columns="1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 0.5fr 3.2rem">
        <Table.Header>
          <div>Class</div>
          <div>Due Date</div>
          <div>Price</div>
          <div>Status</div>
          <div>Schedule</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={fees}
          render={(fee) => <FeeRow key={fee._id} fee={fee} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={fees.length} />
      </Table.Footer>
    </Menus>
  );
}

export default FeeTable;

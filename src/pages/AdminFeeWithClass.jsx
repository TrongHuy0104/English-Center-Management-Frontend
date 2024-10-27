// src/pages/FeesPage.jsx
import React from "react";
import FeeTable from "../features/admin/feeWithClass/FeeTable";
import Row from "../ui/Row";
import FeeTableOperations from "../features/admin/feeWithClass/FeeOperations";

function FeeWithClass() {
  return (
    <>
      <Row type="horizontal">
        <h2>Fees Management</h2>
        <FeeTableOperations />
      </Row>
      <FeeTable />
    </>
  );
}

export default FeeWithClass;

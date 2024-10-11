// src/pages/FeesPage.jsx
import React from "react";
import FeeTable from "../features/admin/fees/FeeTable";
import Row from "../ui/Row";
import FeeTableOperations from "../features/admin/fees/FeeOperations";

function FeesPage() {
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

export default FeesPage;

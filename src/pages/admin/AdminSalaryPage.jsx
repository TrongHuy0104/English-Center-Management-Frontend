// src/pages/SalarysPage.jsx
import React from "react";
import AdminSalaryTable from "../../features/admin/salaries/AdminSalaryTable";
import Row from "../../ui/Row";
import AdminSalaryOperations from "../../features/admin/salaries/AdminSalaryOperations";

function AdminSalaryPage() {
  return (
    <>
      <Row type="horizontal">
        <h2>Salaries Management</h2>
        <AdminSalaryOperations />
      </Row>
      <AdminSalaryTable />
    </>
  );
}

export default AdminSalaryPage;

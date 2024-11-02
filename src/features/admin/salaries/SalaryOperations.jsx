// src/features/Salarys/SalaryTableOperations.jsx
import React from "react";
import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
function SalaryTableOperations() {
  return (
    <TableOperations>
      <SortBy
      // options={[
      //   {
      //     value: "dueDate-desc",
      //     label: "Sort by due date (latest first)",
      //   },
      //   {
      //     value: "dueDate-asc",
      //     label: "Sort by due date (earliest first)",
      //   },
      //   {
      //     value: "amount-desc",
      //     label: "Sort by amount (high first)",
      //   },
      //   {
      //     value: "amount-asc",
      //     label: "Sort by amount (low first)",
      //   },
      // ]}
      />
    </TableOperations>
  );
}

export default SalaryTableOperations;

// src/features/fees/FeeTableOperations.jsx
import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";

function FeeTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "paid", label: "Paid" },
          { value: "unpaid", label: "Unpaid" },
          { value: "overdue", label: "Overdue" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "dueDate-desc",
            label: "Sort by due date (latest first)",
          },
          {
            value: "dueDate-asc",
            label: "Sort by due date (earliest first)",
          },
          {
            value: "amount-desc",
            label: "Sort by amount (high first)",
          },
          {
            value: "amount-asc",
            label: "Sort by amount (low first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default FeeTableOperations;
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import AddTeacher from "./AddTeacher";

function TeacherOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="active"
        options={[
          { value: "all", label: "All" },
          { value: "true", label: "Active" },
          { value: "false", label: "Inactive" },
        ]}
      />
      <AddTeacher />
    </TableOperations>
  );
}

export default TeacherOperations;

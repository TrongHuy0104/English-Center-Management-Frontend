import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import AddStudent from "./AddStudent";
function AdminOperations() {
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
            <AddStudent />
        </TableOperations>
    );
}

export default AdminOperations;

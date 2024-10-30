import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import AddAdmin from "./AddAdmin";

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
            <AddAdmin />
        </TableOperations>
    );
}

export default AdminOperations;

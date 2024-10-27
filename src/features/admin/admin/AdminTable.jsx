import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import useAdmins from "./useAdmins";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import AdminRow from "./AdminRow";

function AdminTable() {
    const { isLoading, admins, total } = useAdmins();

    if (isLoading) return <Spinner />;

    if (!admins.length) return <Empty resource="admin" />;

    return (
        <Menus>
            <Table columns="1.2fr 0.8fr 1.2fr 1fr 0.6fr">
                <Table.Header>
                    <div>Name</div>
                    <div>Phone</div>
                    <div>Email</div>
                    <div>Status</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={admins}
                    render={(admin) => (
                        <AdminRow key={admin.id} admin={admin} />
                    )}
                ></Table.Body>
            </Table>
            <Table.Footer>
                <Pagination count={total} />
            </Table.Footer>
        </Menus>
    );
}

export default AdminTable;

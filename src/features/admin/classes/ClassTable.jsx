import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import ClassRow from "./ClassRow";
import useClasses from "./useClasses";

function ClassTable() {
    const { isLoading, classes, total } = useClasses();

    if (isLoading) return <Spinner />;

    if (!classes.length) return <Empty resource="admin" />;

    return (
        <Menus>
            <Table columns="1fr 1fr 1fr 0.6fr 0.6fr">
                <Table.Header>
                    <div>Name</div>
                    <div>Teacher</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={classes}
                    render={(item) => <ClassRow key={item?.id} item={item} />}
                ></Table.Body>
            </Table>
            <Table.Footer>
                <Pagination count={total} />
            </Table.Footer>
        </Menus>
    );
}

export default ClassTable;

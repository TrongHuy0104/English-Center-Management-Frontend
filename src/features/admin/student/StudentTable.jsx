import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import useStudents from "./useStudents";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import StudentRow from "./StudentRow";

function StudentTable() {
    const { isLoading, students, total } = useStudents();
    if (isLoading) return <Spinner />;

    if (!students.length) return <Empty resource="student" />;

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
                    data={students}
                    render={(student) => (
                     <StudentRow key={student.id} student={student} />
                    )}
                ></Table.Body>
            </Table>
            <Table.Footer>
                <Pagination count={total} />
            </Table.Footer>
        </Menus>
    );
}

export default StudentTable;

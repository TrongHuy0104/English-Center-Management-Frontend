import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import useTeachers from "./useTeachers";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import TeacherRow from "./TeacherRow";

function TeacherTable() {
  const { isLoading, teachers, total } = useTeachers();

  if (isLoading) return <Spinner />;

  if (!teachers.length) return <Empty resource="teacher" />;

  console.log("teachers", teachers);

  return (
    <Menus>
      <Table columns="0.3fr 0.3fr 0.6fr 0.3fr 0.3fr 0.1fr 0.1fr">
        <Table.Header>
          <div>Name</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Shift Pay</div>
          <div>Gender</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={teachers}
          render={(teacher) => (
            <TeacherRow key={teacher.id} teacher={teacher} />
          )}
        ></Table.Body>
      </Table>
      <Table.Footer>
        <Pagination count={total} />
      </Table.Footer>
    </Menus>
  );
}

export default TeacherTable;

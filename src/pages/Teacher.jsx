import { useEffect } from "react";
import TeacherOperations from "../features/admin/teacher/TeacherOperations";
import TeacherTable from "../features/admin/teacher/TeacherTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function Student() {
  const { user } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (user.user.role !== "admin") {
      navigate("/");
    }
  }, [user.user.role, navigate]);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Teachers</Heading>
        <TeacherOperations />
      </Row>
      <Row>
        <TeacherTable />
      </Row>
    </>
  );
}

export default Student;

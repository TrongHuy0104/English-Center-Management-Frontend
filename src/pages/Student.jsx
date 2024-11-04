import { useEffect } from "react";
import StudentOperations from "../features/admin/student/StudentOperations";
import StudentTable from "../features/admin/student/StudentTable";
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
                <Heading as="h1">Students</Heading>
                <StudentOperations />
            </Row>
            <Row>
                <StudentTable />
            </Row>
        </>
    );
}

export default Student;

import { useEffect } from "react";
import AdminOperations from "../features/admin/admin/AdminOperations";
import AdminTable from "../features/admin/admin/AdminTable";
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
                <AdminOperations />
            </Row>
            <Row>
                <AdminTable />
            </Row>
        </>
    );
}

export default Student;

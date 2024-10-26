import { useEffect } from "react";
import AdminOperations from "../features/admin/admin/AdminOperations";
import AdminTable from "../features/admin/admin/AdminTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function Admin() {
    const { user } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
        if (!user.roleDetails?.isSuperAdmin) {
            navigate("/");
        }
    }, [user.user?.role, user.roleDetails.isSuperAdmin, navigate]);
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Admin</Heading>
                <AdminOperations />
            </Row>
            <Row>
                <AdminTable />
            </Row>
        </>
    );
}

export default Admin;

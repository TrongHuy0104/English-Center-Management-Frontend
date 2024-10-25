import CreateUserForm from "../features/admin/user/CreateUserForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function User() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Create a new user</Heading>
            </Row>
            <CreateUserForm />
        </>
    );
}

export default User;

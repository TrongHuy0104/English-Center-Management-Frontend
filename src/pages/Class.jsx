import ClassOperations from "../features/admin/classes/ClassOperations";
import ClassTable from "../features/admin/classes/ClassTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Class() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Class</Heading>
                <ClassOperations />
            </Row>
            <Row>
                <ClassTable />
            </Row>
        </>
    );
}

export default Class;

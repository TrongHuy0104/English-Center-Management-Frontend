import CabinTable from "../features/admin/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/admin/cabins/AddCabin";
import CabinOperations from "../features/admin/cabins/CabinOperations";

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinOperations />
            </Row>
            <Row>
                <CabinTable />
                <div>
                    <AddCabin />
                </div>
            </Row>
        </>
    );
}

export default Cabins;

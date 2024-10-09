import BookingTable from "../features/admin/booking/BookingTable";
import BookingTableOperations from "../features/admin/booking/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All bookings</Heading>
                <BookingTableOperations />
            </Row>
            <Row>
                <BookingTable />
            </Row>
        </>
    );
}

export default Bookings;

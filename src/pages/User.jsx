import Heading from "../ui/Heading";
import Row from "../ui/Row";

function User() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">User</Heading>
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default User;

import FeeTable from "../features/student/fees/FeeTable";
import FeeTableOperations from "../features/student/fees/FeeTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Fees() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All fee</Heading>
      </Row>
      <Row>
        <FeeTable />
      </Row>
    </>
  );
}

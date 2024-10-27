import StudentScheduler from "../features/student/myclass/StudentScheduler";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function MyClass() {
  return <>
    <Row type="horizontal">
      <Heading as="h1">Schedule</Heading>
    </Row>
    <Row>
      <StudentScheduler />
    </Row>
  </>;
}

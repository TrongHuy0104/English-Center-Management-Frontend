import useUser from "../features/authentication/useUser";
import useAttendenceReport from "../features/student/useAttendenceReport";
import Table from "../ui/Table";
import { getClassById, getTeacherById } from "../services/apiStudent";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";

const AttendanceReport = () => {
  const { user } = useUser();
  const attendance = user.roleDetails.attendances;

  const [teachers, setTeachers] = useState({});
  const [classNames, setClassNames] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const { isLoading, attendanceReports, error } =
    useAttendenceReport(attendance);

  useEffect(() => {
    const fetchClassNames = async () => {
      const names = [];
      const teacherMap = {};
      const classPromises = attendanceReports.map(async (report) => {
        const classId = report.class;
        const teacherId = report.teacher_attendance.teacher_id;
        try {
          const classData = await getClassById(classId);
          const teacherData = await getTeacherById(teacherId);
          names.push({
            id: classId,
            name: classData.data.classes.name || "Unknown Class",
          });
          teacherMap[teacherId] = teacherData.data;
        } catch (error) {
          console.error(`Error fetching data for ID ${classId}:`, error);
          names.push({ id: classId, name: "Class Not Found" });
        }
      });
      await Promise.all(classPromises);
      setClassNames(names);
      setTeachers(teacherMap);
    };

    if (attendanceReports && attendanceReports.length > 0) {
      fetchClassNames();
    }
  }, [attendanceReports]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "red";
      default:
        return "gray";
    }
  };

  if (isLoading) {
    return <div>Loading attendance report...</div>;
  }

  if (error) {
    return <div>Error fetching attendance report: {error.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
  };

  const filteredReports = selectedClass
    ? attendanceReports.filter((report) => report.class === selectedClass)
    : [];

  return (
    <div>
      <div>
        <Heading as="h1" style={{ marginBottom: "10px" }}>
          Attendance Report
        </Heading>
      </div>

      <div style={{ display: "flex" }}>
        {/* Class list section */}
        <div style={{ flex: 0.5, marginRight: "20px" }}>
          <Table columns="2fr">
            <Table.Header>
              <div>Classes</div>
            </Table.Header>
            <div>
              {classNames
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ id, name }) => (
                  <StyledRow key={id} onClick={() => handleClassSelect(id)}>
                    <Stacked>
                      <span>{name}</span>
                    </Stacked>
                  </StyledRow>
                ))}
            </div>
          </Table>
        </div>

        {/* Attendance details section */}
        <div style={{ flex: 2 }}>
          <Table columns="2fr 2fr 2fr 2fr 2fr">
            <Table.Header>
              <div>Date</div>
              <div>Slot</div>
              <div>Time</div>
              <div>Teacher</div>
              <div>Student Status</div>
            </Table.Header>

            <div>
              {selectedClass ? (
                filteredReports.length > 0 ? (
                  filteredReports.map((attendanceReport) => {
                    const studentAttendance =
                      attendanceReport.student_attendance?.find(
                        (student) => student.student_id === user.roleDetails._id
                      );

                    return (
                      <Table.Row key={attendanceReport._id}>
                        <Stacked>
                          <span>{formatDate(attendanceReport.date)}</span>
                        </Stacked>
                        <Stacked>
                          <span>{attendanceReport.slot || "Unknown Slot"}</span>
                        </Stacked>
                        <Stacked>
                          <span>
                            {" "}
                            {`${attendanceReport.start_time || "N/A"}-${
                              attendanceReport.end_time || "N/A"
                            }`}
                          </span>
                        </Stacked>
                        <Stacked>
                          <span>
                            {teachers[
                              attendanceReport.teacher_attendance.teacher_id
                            ]?.name || "Unknown Teacher"}
                          </span>
                        </Stacked>
                        <Stacked>
                          <span
                            style={{
                              color: getStatusColor(studentAttendance?.status),
                            }}
                          >
                            {studentAttendance?.status || "No Status"}
                          </span>
                        </Stacked>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <OneLineMessage>
                      No attendance data available for this class.
                    </OneLineMessage>
                  </Table.Row>
                )
              ) : (
                <Table.Row>
                  <OneLineMessage>
                    Please select a class to view attendance details.
                  </OneLineMessage>
                </Table.Row>
              )}
            </div>
          </Table>
        </div>
      </div>
    </div>
  );
};

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Stacked = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--color-grey-600);
`;

const OneLineMessage = styled.div`
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

export default AttendanceReport;

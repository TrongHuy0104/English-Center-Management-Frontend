import styled from "styled-components";
import Stats from "./Stats";
import useDashboard from "./useDashboard";
import Spinner from "../../../ui/Spinner";
import ClassTypeChart from "./ClassTypeChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, dashboard } = useDashboard();
  if (isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        students={dashboard.students}
        teachers={dashboard.teachers}
        admins={dashboard.admins}
        classes={dashboard.classes}
      />
      <ClassTypeChart classType={dashboard.types} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

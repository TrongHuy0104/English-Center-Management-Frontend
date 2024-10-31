import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useClassById from '../features/student/myclass/useClassById';
import { format } from 'date-fns';
import { getColorIndex, linearColor } from '../features/student/myclass/ClassTag';
import useSendEnrollRequest from '../features/student/myclass/useSendEnrollRequest';

import Row from '../ui/Row';
import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';

const StudentDetailWrapper = styled.div`  
  
  display: flex;
  height: 70vh;
  width: 100%;
  gap: 50px;
`;

const EnrollButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: 0.5px solid #4f46e5; 
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background-color: white;
    color: #4f46e5;
  }
  
`;

const LeftSection = styled.div`
  flex: 1;
  background: ${({ id }) => linearColor[getColorIndex(id)]};
  display: flex;
  flex-direction: column;
  position: relative;  
  align-items: center;
  justify-content: end;
  border-radius: 12px;
  color: #fff;
  padding: 40px;
  box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.2);
`;

const RightSection = styled.div`
  background: rgba(255, 255, 255, 0.3); 
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  flex: 2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassDetailTitle = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const ClassInfo = styled.div`
  background: rgba(255, 255, 255, 0.3);   
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const ClassName = styled.h3`
  font-size: 1.6rem;
  width: 30vh;
  margin: 0;
  font-weight: bold;
  color: #333;
`;

const ClassDetail = styled.p`
  font-size: 1.5rem;
  margin: 8px 0 0;
  color: #666;
`;

const StudentDetail = () => {
  const { classid } = useParams();
  const { isLoading, classDetail, error } = useClassById(classid);
  const { mutate: enroll, isLoading: isEnrolling } = useSendEnrollRequest();

  const handleEnroll = () => {
    enroll(classid);
  };

  if (isLoading) return <Spinner />;
  if (classDetail.length) return <Empty resource="class list" />;
  if (!classDetail.schedule.length) return <Empty resource="class schedule" />;
  

  const formattedDeadline = format(new Date(classDetail.enrollment_deadline), 'MMMM dd, yyyy');
  const firstSchedule = classDetail.schedule[0];
  const lastSchedule = classDetail.schedule[classDetail.schedule.length - 1];
  const formattedFirstDate = format(new Date(firstSchedule.date), 'dd/MM/yyyy');
  const formattedLastDate = format(new Date(lastSchedule.date), 'dd/MM/yyyy');

  return (
    <Row type="vertical">
      <Heading as="h1">Class Detail</Heading>
      <StudentDetailWrapper>
        {/* Left Section */}
        <LeftSection id={classDetail._id}>
          <ClassInfo>
            <ClassName>{classDetail.name}</ClassName>
            <ClassDetail>Enrollment Deadline: {formattedDeadline}</ClassDetail>
            <ClassDetail><h4>{formattedFirstDate} - {formattedLastDate}</h4></ClassDetail>
          </ClassInfo>
        </LeftSection>

        {/* Right Section */}
        <RightSection>
          {/* Container for Title and Enroll Button */}
          <HeaderContainer>
            <ClassDetailTitle>Information</ClassDetailTitle>
            {/* Nút Enroll chỉ hiển thị khi người dùng chưa enroll */}
            {!classDetail.isEnrolled && (
              <EnrollButton onClick={handleEnroll}>Enroll</EnrollButton>
            )}
          </HeaderContainer>

          <ClassInfo>
            <p><strong>Teacher:</strong> {classDetail.teacher ? classDetail.teacher.name : "No Teacher Assigned"}</p>
            <p><strong>Current Enrollment:</strong> {classDetail.current_enrollment} / {classDetail.max_enrollment}</p>
            <p><strong>Description:</strong> {classDetail.description}</p>
          </ClassInfo>

          <ClassDetailTitle>Schedule</ClassDetailTitle>
            {classDetail.schedule.map((item, index) => (
              <ClassInfo key={index}>
                <p><strong>Slot {item.slot}:</strong> {item.start_time} - {item.end_time}</p>
                <p><strong>Date:</strong> {format(new Date(item.date), 'dd/MM/yyyy')}</p>
              </ClassInfo>
            ))}
        </RightSection>
      </StudentDetailWrapper>
    </Row>
  );
};

export default StudentDetail;

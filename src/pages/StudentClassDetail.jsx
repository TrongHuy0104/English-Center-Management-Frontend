// import React from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
// import useClassById from '../features/student/myclass/useClassById';
// import { format } from 'date-fns'; // Để định dạng lại ngày tháng
// import Row from '../ui/Row';
// import Heading from '../ui/Heading';
// import useSendEnrollRequest from '../features/student/myclass/useSendEnrollRequest';

// const ClassDetailWrapper = styled.div`
//   background: #ffffff;
//   border-radius: 15px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
//   padding: 20px;
//   width: max-content;
//   height: max-content;
//   margin: 30px auto;
//   color: #333;
//   position: relative; 
// `;

// const ClassContent = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
// `;

// const ClassColumn = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const ClassHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 10px;

//   h2 {
//     font-size: 4rem;
//     margin: 10px;
//   }

//   h4 {
//     font-size: 2.5rem;
//     color: #777;
//     margin-top: 5px;
//   }
// `;

// const ClassInfo = styled.div`
//   p {
//     margin: 20px;
//     font-size: 2rem;
//   }

//   span {
//     font-weight: bold;
//   }
// `;

// const ScheduleItem = styled.div`
//   background: #f9f9f9;
//   padding: 10px;
//   border-radius: 8px;
//   margin-bottom: 5px;
// `;

// const ClassDescription = styled.div`
//   margin-top: 30px;
//   p {
//     font-size: 1.8rem;
//     margin: 20px;
//     text-align: justify;
//   }
// `;

// const EnrollButton = styled.button`

//   background-color: #4f46e5;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 8px;
//   border: 0.5px solid #4f46e5; 
//   cursor: pointer;
//   font-size: 1.2rem;
//   position: absolute; 
//   top: 20px; 
//   right: 20px; 
//   &:hover {
//         background-color: white;
//         color: #4f46e5;
//   }
// `;

// const StudentClassDetail = () => {
//     const { classid } = useParams();
//     const { isLoading, classDetail, error } = useClassById(classid);
//     const { mutate: enroll, isLoading: isEnrolling } = useSendEnrollRequest();

//     if (isLoading) {
//         return <p>Loading class details...</p>;
//     }

//     if (error) {
//         return <p>Error loading class details. Please try again later.</p>;
//     }

//     if (!classDetail) {
//         return <p>No class details available.</p>;
//     }

//     // Kiểm tra xem người dùng đã enroll vào lớp này chưa

//     // Lấy ngày đầu tiên và ngày cuối cùng từ lịch
//     const firstSchedule = classDetail.schedule[0];
//     const lastSchedule = classDetail.schedule[classDetail.schedule.length - 1];
//     const formattedFirstDate = format(new Date(firstSchedule.date), 'dd/MM/yyyy');
//     const formattedLastDate = format(new Date(lastSchedule.date), 'dd/MM/yyyy');

//     // Hàm xử lý Enroll
//     const handleEnroll = () => {
//         enroll(classid);
//     };

//     return (
//         <Row type="vertical">
//             <Heading as="h1">Class Detail</Heading>
//             <ClassDetailWrapper>
//                 {/* Nút Enroll chỉ hiển thị khi người dùng chưa enroll */}
//                 {!classDetail.isEnrolled && (
//                     <EnrollButton onClick={handleEnroll}>Enroll</EnrollButton>
//                 )}
//                 <ClassHeader>
//                     <h2>{classDetail.name}</h2>
//                     <h4>{formattedFirstDate} - {formattedLastDate}</h4>
//                 </ClassHeader>
//                 <ClassContent>
//                     {/* Left Column */}
//                     <ClassColumn>
//                         <ClassInfo>
//                             <p><span>Location:</span> {classDetail.center?.location}</p>
//                             <p><span>Teacher:</span> {classDetail.teacher ? classDetail.teacher.name : "No Teacher Assigned"}</p>
//                             <p><span>Current Enrollment:</span> {classDetail.current_enrollment} / {classDetail.max_enrollment}</p>
//                             <p><span>Enrollment Deadline:</span> {format(new Date(classDetail.enrollment_deadline), 'dd/MM/yyyy')}</p>
//                         </ClassInfo>
//                     </ClassColumn>

//                     {/* Right Column */}
//                     <ClassColumn>
//                         <ClassInfo>
//                             <p><span>Schedule:</span></p>
//                             {classDetail?.schedule.map((item, index) => (
//                                 <ScheduleItem key={index}>
//                                     <p><span>Slot {item.slot}:</span> {item.start_time} - {item.end_time}</p>
//                                 </ScheduleItem>
//                             ))}
//                         </ClassInfo>
//                     </ClassColumn>
//                 </ClassContent>

//                 {/* Description moved to bottom */}
//                 <ClassDescription>
//                     <p><span>{classDetail.description}</span></p>
//                 </ClassDescription>
//             </ClassDetailWrapper>
//         </Row>
//     );
// };

// export default StudentClassDetail;

import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useClassById from '../features/student/myclass/useClassById';
import { format } from 'date-fns';
import { getColorIndex, linearColor } from '../features/student/myclass/ClassTag';
import Row from '../ui/Row';
import Heading from '../ui/Heading';

const StudentDetailWrapper = styled.div`  
  
  display: flex;
  height: 70vh;
  width: 100%;
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

  const handleEnroll = () => {
    enroll(classid);
  };

  if (isLoading) return <p>Loading class details...</p>;
  if (error) return <p>Error loading class details. Please try again later.</p>;

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

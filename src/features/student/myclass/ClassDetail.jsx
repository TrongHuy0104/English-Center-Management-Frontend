import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useClassById from './useClassById';
import { format } from 'date-fns'; // Để định dạng lại ngày tháng
import Row from '../../../ui/Row';
import Heading from '../../../ui/Heading';
import useSendEnrollRequest from './useSendEnrollRequest';

const ClassDetailWrapper = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: max-content;
  height: max-content;
  margin: 30px auto;
  color: #333;
  position: relative; /* Đặt vị trí tương đối để chứa nút Enroll */
`;

const ClassContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ClassColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ClassHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 4rem;
    margin: 10px;
  }

  h4 {
    font-size: 2.5rem;
    color: #777;
    margin-top: 5px;
  }
`;

const ClassInfo = styled.div`
  p {
    margin: 20px;
    font-size: 2rem;
  }

  span {
    font-weight: bold;
  }
`;

const ScheduleItem = styled.div`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const ClassDescription = styled.div`
  margin-top: 30px;
  p {
    font-size: 1.8rem;
    margin: 20px;
    text-align: justify;
  }
`;

const EnrollButton = styled.button`
  
  background-color: #4f46e5;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: 0.5px solid #4f46e5; 
  cursor: pointer;
  font-size: 1.2rem;
  position: absolute; 
  top: 20px; 
  right: 20px; 
  &:hover {
        background-color: white;
        color: #4f46e5;
  }
`;

const ClassDetail = () => {
    const { classid } = useParams();
    const { isLoading, classDetail, error } = useClassById(classid);
    const { mutate: enroll, isLoading: isEnrolling } = useSendEnrollRequest();

    if (isLoading) {
        return <p>Loading class details...</p>;
    }

    if (error) {
        return <p>Error loading class details. Please try again later.</p>;
    }

    if (!classDetail) {
        return <p>No class details available.</p>;
    }

    // Kiểm tra xem người dùng đã enroll vào lớp này chưa

    // Lấy ngày đầu tiên và ngày cuối cùng từ lịch
    const firstSchedule = classDetail.schedule[0];
    const lastSchedule = classDetail.schedule[classDetail.schedule.length - 1];
    const formattedFirstDate = format(new Date(firstSchedule.date), 'dd/MM/yyyy');
    const formattedLastDate = format(new Date(lastSchedule.date), 'dd/MM/yyyy');

    // Hàm xử lý Enroll
    const handleEnroll = () => {
        enroll(classid);
    };

    return (
        <Row type="vertical">
            <Heading as="h1">Class Detail</Heading>
            <ClassDetailWrapper>
                {/* Nút Enroll chỉ hiển thị khi người dùng chưa enroll */}
                {!classDetail.isEnrolled && (
                    <EnrollButton onClick={handleEnroll}>Enroll</EnrollButton>
                )}
                <ClassHeader>
                    <h2>{classDetail.name}</h2>
                    <h4>{formattedFirstDate} - {formattedLastDate}</h4>
                </ClassHeader>
                <ClassContent>
                    {/* Left Column */}
                    <ClassColumn>
                        <ClassInfo>
                            <p><span>Center:</span> {classDetail.center?.name}</p>
                            <p><span>Location:</span> {classDetail.center?.location}</p>
                            <p><span>Teacher:</span> {classDetail.teacher ? classDetail.teacher.name : "No Teacher Assigned"}</p>
                            <p><span>Current Enrollment:</span> {classDetail.current_enrollment} / {classDetail.max_enrollment}</p>
                            <p><span>Enrollment Deadline:</span> {format(new Date(classDetail.enrollment_deadline), 'dd/MM/yyyy')}</p>
                        </ClassInfo>
                    </ClassColumn>

                    {/* Right Column */}
                    <ClassColumn>
                        <ClassInfo>
                            <p><span>Schedule:</span></p>
                            {classDetail?.schedule.map((item, index) => (
                                <ScheduleItem key={index}>
                                    <p><span>Slot {item.slot}:</span> {item.start_time} - {item.end_time}</p>
                                </ScheduleItem>
                            ))}
                        </ClassInfo>
                    </ClassColumn>
                </ClassContent>

                {/* Description moved to bottom */}
                <ClassDescription>
                    <p><span>{classDetail.description}</span></p>
                </ClassDescription>
            </ClassDetailWrapper>
        </Row>
    );
};

export default ClassDetail;

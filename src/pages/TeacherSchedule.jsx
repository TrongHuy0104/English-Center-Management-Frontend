import useUser from "../features/authentication/useUser"; // Lấy thông tin user
import useTeacherSchedule from "../features/Teacher/useTeacherSchedule"; // Lấy lịch trình của giáo viên
import styled from "styled-components"; // Sử dụng styled-components để tạo các thành phần giao diện

// Các thành phần styled-components
const ScheduleContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const ScheduleList = styled.ul`
    margin-top: 20px;
    padding: 0;
`;

const ScheduleItem = styled.li`
    list-style: none;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const TeacherInfo = styled.p`
    font-size: 1em;
    color: #777;
`;

const PageHeader = styled.h1`
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

function TeacherSchedule() {
    const { isLoading: isLoadingUser, user } = useUser(); // Lấy thông tin user
    const teacherId = user.roleDetails._id; // Lấy ID của giáo viên
    const { isLoading: isLoadingSchedule, schedule } = useTeacherSchedule(teacherId); // Lấy dữ liệu lịch trình của giáo viên

    if (isLoadingUser || isLoadingSchedule) {
        return <div>Loading...</div>; // Hiển thị trạng thái loading nếu đang tải dữ liệu
    }
    
    const schedules = schedule?.schedules || [];

    return (
        <>
            {/* Hiển thị tiêu đề của trang Teacher Schedule */}
            <PageHeader>Teacher Schedule</PageHeader>

            {schedules.length > 0 ? (
                <>
                    
                    <ScheduleContainer>
                    <h1>{schedules[0].className}</h1> {/* Hiển thị className */}
                        {schedules[0].schedule.length > 0 ? (
                            <ScheduleList>
                                {schedules[0].schedule.map((item) => (
                                    <ScheduleItem key={item._id}>
                                        {item.day} - {item.start_time} to {item.end_time}
                                    </ScheduleItem>
                                ))}
                            </ScheduleList>
                        ) : (
                            <TeacherInfo>No schedule available.</TeacherInfo>
                        )}
                    </ScheduleContainer>
                </>
            ) : (
                <TeacherInfo>No teacher schedule available.</TeacherInfo>
            )}
        </>
    );
}

export default TeacherSchedule;

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useSchedule from "./useSchedule";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";

// Định nghĩa các theme với styled-components
const retroTheme = {
    buttonBackground: "#0d0149",
    buttonText: "#ffffff",
    buttonHoverBackground: "#4f46e5",
    buttonActiveBackground: "#ffffff",
};

// Styled component cho FullCalendar button
const CalendarWrapper = styled.div`
    .fc .fc-button {
        background-color: ${(props) => props.theme.buttonBackground};
        color: ${(props) => props.theme.buttonText};
        border: none;
    }

    .fc .fc-button:hover {
        background-color: ${(props) => props.theme.buttonHoverBackground};
        color: ${(props) => props.theme.buttonText};
    }

    .fc .fc-button-active {
        background-color: ${(props) => props.theme.buttonActiveBackground};
        color: ${(props) => props.theme.buttonText};
    }
`;

const ScheduleCalendar = () => {
    const { isLoading, schedules, error } = useSchedule();
    const [theme] = useState(retroTheme); // Theme mặc định
    const navigate = useNavigate(); // Khởi tạo hook điều hướng

    if (isLoading) {
        return <Spinner />;
    }

    if (!schedules.length) {
        return <Empty resource="schedule" />;
    }

    const events = schedules.flatMap((cls) =>
        cls.schedule.map((item) => {
            return {
                title: `${cls.name} - slot ${item.slot}`,
                start: `${item.date.split("T")[0]}T${item.start_time}:00`,
                end: `${item.date.split("T")[0]}T${item.end_time}:00`,
                backgroundColor: "#6B5B95",
                textColor: "#ffffff",
                extendedProps: {
                    classId: cls._id, // Thêm ID của lớp học để dùng khi điều hướng
                },
            };
        })
    );

    // Hàm xử lý sự kiện khi nhấn vào sự kiện trên calendar
    const handleEventClick = (clickInfo) => {
        const classId = clickInfo.event.extendedProps.classId;
        navigate(`/students/classes/${classId}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ width: "100%", margin: "0 auto" }}>
                <CalendarWrapper>
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        initialDate={new Date()}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridWeek,timeGridDay",
                        }}
                        contentHeight="600px"
                        slotMinTime="07:00:00"
                        slotMaxTime="20:00:00"
                        events={events} // Đưa dữ liệu vào FullCalendar
                        eventClick={handleEventClick} // Xử lý sự kiện khi nhấn vào sự kiện
                        selectable={true} // Cho phép chọn tuần
                        editable={false} // Không cho phép chỉnh sửa lịch trực tiếp
                        locale="en"
                        nowIndicator={true}
                        weekNumbers={true}
                        allDaySlot={false}
                    />
                </CalendarWrapper>
            </div>
        </ThemeProvider>
    );
};

export default ScheduleCalendar;

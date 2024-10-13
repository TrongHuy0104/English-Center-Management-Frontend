import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { ThemeProvider } from "styled-components";
import useSchedule from "./useSchedule";

// Định nghĩa các theme với styled-components
const retroTheme = {
  buttonBackground: "#0d0149",
  buttonText: "#ffffff",
  buttonHoverBackground: "#4f46e5",
  buttonActiveBackground:   "#ffffff",
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

// Styled component cho nút chuyển đổi theme

const ScheduleCalendar = () => {
  const { isLoading, schedules, error } = useSchedule();
  const [theme] = useState(retroTheme); // Theme mặc định

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading schedules: {error.message}</div>;
  }

  // Mảng màu retro để sự kiện có màu khác nhau
  const retroColors = [
    // "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251", "#B565A7",

    "#6B5B95"
  ];

  const events = schedules.flatMap((cls) =>
    cls.schedule.map((item) => {
      const randomColor = retroColors[Math.floor(Math.random() * retroColors.length)];
      return {
        title: cls.name,
        start: `${item.date.split("T")[0]}T${item.start_time}:00`,
        end: `${item.date.split("T")[0]}T${item.end_time}:00`,
        backgroundColor: randomColor,
        textColor: "#ffffff",
      };
    })
  );

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
            contentHeight="500px"
            slotMinTime="06:00:00"
            slotMaxTime="20:00:00"
            events={events} // Đưa dữ liệu vào FullCalendar
            selectable={true} // Cho phép chọn tuần
            editable={false} // Không cho phép chỉnh sửa lịch trực tiếp
            locale="en"
            nowIndicator={true}
            weekNumbers={true}
          />
        </CalendarWrapper>
      </div>
    </ThemeProvider>
  );
};

export default ScheduleCalendar;

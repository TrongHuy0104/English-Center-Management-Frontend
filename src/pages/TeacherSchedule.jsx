import { useState } from "react";
import useUser from "../features/authentication/useUser"; 
import useTeacherSchedule from "../features/Teacher/useTeacherSchedule"; 
import styled, { ThemeProvider } from "styled-components";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Define theme
const retroTheme = {
  buttonBackground: "#0d0149",
  buttonText: "#ffffff",
  buttonHoverBackground: "#4f46e5",
  buttonActiveBackground: "#ffffff",
};


// Styled component for FullCalendar buttons
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


function TeacherSchedule() {
  const { isLoading: isLoadingUser, user } = useUser(); 
  const teacherId = user?.roleDetails?._id; 
  const { isLoading: isLoadingSchedule, schedule, error } = useTeacherSchedule(teacherId); 
  const [theme] = useState(retroTheme); 
  
  if (isLoadingUser || isLoadingSchedule) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const schedules = schedule?.schedules || [];
  const retroColors = ["#6B5B95", "#FF6F61"]; 

  // Ensure that the date field is valid before splitting it
  const events = schedules.flatMap(cls =>
    cls.schedule.map(item => {
      if (!item.date) {
        return null; // Skip events with missing date
      }

      const randomColor = retroColors[Math.floor(Math.random() * retroColors.length)];
      return {
        title: cls.className,
        start: `${item.date.split("T")[0]}T${item.start_time}:00`,
        end: `${item.date.split("T")[0]}T${item.end_time}:00`,
        backgroundColor: randomColor,
        textColor: "#ffffff",
      };
    }).filter(event => event !== null) // Filter out any null values
  );

  return (
    <ThemeProvider theme={theme}>
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
          events={events}
          contentHeight="500px"
          slotMinTime="06:00:00"
          slotMaxTime="20:00:00"
          selectable={true}
          editable={false}
          nowIndicator={true}
        />
      </CalendarWrapper>
    </ThemeProvider>
  );
}

export default TeacherSchedule;

import { useState } from "react";
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { ThemeProvider } from "styled-components";
import useClass from "./useClass";


const retroTheme = {
    buttonBackground: "#0d0149",
    buttonText: "#ffffff",
    buttonHoverBackground: "#4f46e5",
    buttonActiveBackground: "#ffffff",
};

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

const ClassSchedule = () => {
    const { classId } = useParams();
    const {isLoading, classDetail, error } = useClass(classId);
    const [theme] = useState(retroTheme);
    const retroColors = ["#6B5B95"];

    const events = classDetail?.schedule?.map((item) => {
        const randomColor = retroColors[Math.floor(Math.random() * retroColors.length)];
        return {
            title: classDetail.name, 
            start: `${item.date.split("T")[0]}T${item.start_time}:00`,
            end: `${item.date.split("T")[0]}T${item.end_time}:00`,
            backgroundColor: randomColor,
            textColor: "#ffffff",
        };
    }) || [];

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
                        selectable={true}
                        editable={false}
                        locale="en"
                        nowIndicator={true}
                        weekNumbers={true}
                    />
                </CalendarWrapper>
            </div>
        </ThemeProvider>
    );
};

export default ClassSchedule;

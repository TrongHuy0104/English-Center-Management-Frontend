import { useState } from "react";
import useUser from "../../authentication/useUser";
import useTeacherSchedule from "./useTeacherSchedule";
import styled, { ThemeProvider } from "styled-components";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Spinner from "../../../ui/Spinner";

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
    const {
        isLoading: isLoadingSchedule,
        teacherschedule,
        error,
    } = useTeacherSchedule(teacherId);

    const [theme] = useState(retroTheme);
    if (isLoadingUser || isLoadingSchedule) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const schedules = teacherschedule?.data.classes || [];
    const retroColors = ["#6B5B95", "#FF6F61"];

    const events = schedules.flatMap((cls) =>
        cls.schedule.map((item) => {
            const randomColor =
                retroColors[Math.floor(Math.random() * retroColors.length)];
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
                        events={events}
                        selectable={true}
                        editable={false}
                        locale="en"
                        nowIndicator={true}
                        weekNumbers={true}
                        allDaySlot={false}
                    />
                </CalendarWrapper>
            </div>
        </ThemeProvider>
    );
}

export default TeacherSchedule;

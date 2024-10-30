import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { ThemeProvider } from "styled-components";
import useClass from "./useClass";
import Spinner from "../../../ui/Spinner";
import ScheduleForm from "./ScheduleForm";

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
    const { isLoading, classDetail, error } = useClass(classId);
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentScheduleSelect, setCurrentScheduleSelect] = useState(null);

    const retroColors = ["#6B5B95"];

    const slotTimeMapping = {
        1: { start_time: "07:00", end_time: "08:30" },
        2: { start_time: "08:45", end_time: "10:15" },
        3: { start_time: "10:30", end_time: "12:00" },
        4: { start_time: "12:30", end_time: "14:00" },
        5: { start_time: "14:15", end_time: "15:45" },
        6: { start_time: "16:00", end_time: "17:30" },
        7: { start_time: "18:00", end_time: "19:30" },
        8: { start_time: "19:45", end_time: "21:15" },
    };

    // Generate initial events from class detail
    const generateInitialEvents = () => {
        return (
            classDetail?.schedule?.map((item) => {
                const randomColor =
                    retroColors[Math.floor(Math.random() * retroColors.length)];
                return {
                    title: classDetail.name,
                    start: `${item.date.split("T")[0]}T${item.start_time}:00`,
                    end: `${item.date.split("T")[0]}T${item.end_time}:00`,
                    backgroundColor: randomColor,
                    textColor: "#ffffff",
                };
            }) || []
        );
    };

    // Set initial events when class detail is loaded
    useEffect(() => {
        if (classDetail) {
            setEvents(generateInitialEvents());
        }
    }, [classDetail]);

    const handleEventClick = (info) => {
        alert(
            `Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`
        );
    };

    const handleDateClick = (arg) => {
        console.log("arg", arg);

        // const title = prompt("Enter Event Title:");
        // if (title) {
        //     const newEvent = {
        //         title,
        //         start: arg.date,
        //         end: arg.date,
        //         backgroundColor: "#ff9f00",
        //         textColor: "#ffffff",
        //     };
        //     console.log("newEvent", newEvent);

        //     setEvents((prevEvents) => [...prevEvents, newEvent]);
        // }
        setModalOpen(true);
        setCurrentScheduleSelect(arg);
    };

    if (isLoading) return <Spinner />;
    console.log("generateInitialEvents", classDetail?.schedule);

    return (
        <ThemeProvider theme={retroTheme}>
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
                        slotMaxTime="22:00:00"
                        events={events} // Set the events state to FullCalendar
                        selectable={true}
                        editable={false}
                        locale="en"
                        nowIndicator={true}
                        weekNumbers={true}
                        // eventClick={handleEventClick} // Add event click handler
                        dateClick={handleDateClick} // Add date click handler
                    />
                </CalendarWrapper>
                {modalOpen && (
                    <ScheduleForm
                        setModalOpen={setModalOpen}
                        currentScheduleSelect={currentScheduleSelect}
                    />
                )}
            </div>
        </ThemeProvider>
    );
};

export default ClassSchedule;

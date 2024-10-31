import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled, { ThemeProvider } from "styled-components";
import useClass from "./useClass";
import ScheduleForm from "./ScheduleForm";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useRemoveSchedule from "./useRemoveSchedule";

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

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
    max-height: 90vh;
    overflow: auto;
    z-index: 99;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const ClassSchedule = () => {
    const { classId } = useParams();
    const { isLoading, classDetail } = useClass(classId);
    const { isLoadingDelete, removeSchedule } = useRemoveSchedule();
    const [events, setEvents] = useState([]);
    const [currentScheduleSelect, setCurrentScheduleSelect] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [removeData, setRemoveData] = useState();

    const retroColors = ["#6B5B95"];

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

    const slotTimeMapping = [
        { start_time: "07:00", end_time: "08:30", slot: 1 },
        { start_time: "08:45", end_time: "10:15", slot: 2 },
        { start_time: "10:30", end_time: "12:00", slot: 3 },
        { start_time: "12:30", end_time: "14:00", slot: 4 },
        { start_time: "14:15", end_time: "15:45", slot: 5 },
        { start_time: "16:00", end_time: "17:30", slot: 6 },
        { start_time: "18:00", end_time: "19:30", slot: 7 },
        { start_time: "19:45", end_time: "21:15", slot: 8 },
    ];

    function extractTimes(dateString) {
        // Regular expression to match the time format HH:MM
        const timeRegex = /(\d{2}:\d{2})/g;

        // Extracting times
        const times = dateString.match(timeRegex);

        return times || []; // Return an empty array if no matches found
    }

    const handleEventClick = (info) => {
        const start_time = extractTimes(info.event.start.toString())[0];
        const end_time = extractTimes(info.event.end.toString())[0];
        const slot = slotTimeMapping.find(
            (item) =>
                item.start_time === start_time && item.end_time === end_time
        );
        setIsOpenDelete(true);
        setRemoveData({
            postSchedule: {
                date: `${
                    new Date(info.event.start).toISOString().split("T")[0]
                }T00:00:00.000Z`,
                slot: slot.slot,
            },
        });
    };

    const handleDateClick = (arg) => {
        setModalOpen(true);
        setCurrentScheduleSelect(arg);
    };

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
                        slotMinTime="07:00:00"
                        slotMaxTime="22:00:00"
                        events={events} // Set the events state to FullCalendar
                        selectable={true}
                        editable={false}
                        locale="en"
                        nowIndicator={true}
                        weekNumbers={true}
                        eventClick={handleEventClick} // Add event click handler
                        dateClick={handleDateClick} // Add date click handler
                    />
                </CalendarWrapper>
                {modalOpen && (
                    <ScheduleForm
                        setModalOpen={setModalOpen}
                        currentScheduleSelect={currentScheduleSelect}
                    />
                )}
                {isOpenDelete && (
                    <Overlay>
                        <StyledModal>
                            <ConfirmDelete
                                resourceName="schedule"
                                disabled={false}
                                onConfirm={() => {
                                    removeSchedule({
                                        postSchedule: removeData,
                                    });
                                }}
                                onCloseModal={() => setIsOpenDelete(false)}
                            />
                        </StyledModal>
                    </Overlay>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ClassSchedule;

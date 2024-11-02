import { useForm } from "react-hook-form";
// import { format } from "date-fns";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import Spinner from "../../../ui/Spinner";
import styled from "styled-components";
import useCreateSchedule from "./useCreateSchedule";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";

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
const Opinion = styled.div`
    font-size: 1.4rem;
`;

function ScheduleForm({ setModalOpen, currentScheduleSelect }) {
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: {},
    });
    const { errors } = formState;
    const [isAddMultiple, setIsAddMultiple] = useState(false);

    const slots = [
        { value: "", label: "--select --" },
        { value: "1-07:00-08:30", label: "slot 1 (07:00-08:30)" },
        { value: "2-08:45-10:15", label: "slot 2 (08:45-10:15)" },
        { value: "3-10:30-12:00", label: "slot 3 (10:30-12:00)" },
        { value: "4-12:30-14:00", label: "slot 4 (12:30-14:00)" },
        { value: "5-14:15-15:45", label: "slot 5 (14:15-15:45)" },
        { value: "6-16:00-17:30", label: "slot 6 (16:00-17:30)" },
        { value: "7-18:00-19:30", label: "slot 7 (18:00-19:30)" },
        { value: "8-19:45-21:15", label: "slot 8 (19:45-21:15)" },
    ];

    const { isLoadingCreate, createSchedule } = useCreateSchedule();
    const { classId } = useParams();

    function calculateDaysBetween(startDate, endDate) {
        // Convert to Date objects
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds
        const diffMilliseconds = end - start;

        // Convert milliseconds to days
        const diffDays =
            Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24)) - 1;

        return diffDays;
    }

    function onSubmit(data) {
        let schedules = { schedules: [] };
        if (data?.endDate) {
            const daysBetween =
                calculateDaysBetween(currentScheduleSelect.date, data.endDate) +
                1;
            function getFutureDate(currentDate, i) {
                const newDate = new Date(currentDate);
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(newDate.getDate() + 7 * i);
                return newDate;
            }

            function toLocalISOString(date) {
                const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                );
                return localDate.toISOString();
            }

            const numLoop = Math.floor(daysBetween / 7);
            for (let i = 0; i <= numLoop; i++) {
                const items = data.slot.split("-");
                const currentDate = new Date(currentScheduleSelect.date);
                const scheduleData = {
                    slot: items[0],
                    start_time: items[1],
                    end_time: items[2],
                    date: toLocalISOString(getFutureDate(currentDate, i)),
                    // `${
                    //     new Date(info.event.start).toISOString().split("T")[0]
                    // }T00:00:00.000Z`,
                };
                schedules.schedules.push(scheduleData);
            }
        } else {
            const items = data.slot.split("-");
            const scheduleData = {
                slot: items[0],
                start_time: items[1],
                end_time: items[2],
                date:
                    new Date(currentScheduleSelect.date)
                        .toISOString()
                        .split("T")[0] + "T00:00:00.000Z",
                endDate: data?.endDate,
            };
            schedules.schedules.push(scheduleData);
        }

        createSchedule(
            { data: schedules, id: classId },
            {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                },
            }
        );
    }

    function onError(errors) {
        console.log(errors);
    }

    if (isLoadingCreate) return <Spinner />;
    return (
        <Overlay>
            <StyledModal>
                <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
                    <FormRow label="Slot" error={errors?.slot?.message}>
                        <Select
                            id="slot"
                            options={slots}
                            style={{ width: "70%" }}
                            {...register("slot", {
                                required: "This field is required",
                            })}
                            disabled={false}
                        />
                    </FormRow>

                    {isAddMultiple && (
                        <>
                            <FormRow
                                label="Start Date"
                                error={errors?.startDate?.message}
                            >
                                <Input
                                    type="date"
                                    id="startDate"
                                    defaultValue={format(
                                        new Date(currentScheduleSelect.date),
                                        "yyyy-MM-dd"
                                    )}
                                    {...register("startDate")}
                                    disabled={true}
                                />
                            </FormRow>

                            <FormRow
                                label="End Date"
                                error={errors?.endDate?.message}
                            >
                                <Input
                                    type="date"
                                    id="endDate"
                                    {...register("endDate", {
                                        validate: {
                                            notEarlierThanStartDate: (
                                                value
                                            ) => {
                                                const endDate = new Date(
                                                    value
                                                ).setHours(0, 0, 0, 0);
                                                const start = new Date(
                                                    currentScheduleSelect.date
                                                );
                                                return (
                                                    endDate > start ||
                                                    "End date cannot be earlier than start date"
                                                );
                                            },
                                            notMoreThan30Days: (value) => {
                                                const endDate = new Date(value);
                                                const start = new Date(
                                                    currentScheduleSelect.date
                                                );
                                                const diffDays =
                                                    (endDate - start) /
                                                    (1000 * 60 * 60 * 24);
                                                return (
                                                    diffDays <= 30 ||
                                                    "End date cannot be more than 30 days after start date"
                                                );
                                            },
                                        },
                                    })}
                                    disabled={false}
                                />
                            </FormRow>
                        </>
                    )}

                    <FormRow>
                        <Opinion>
                            <input
                                type="checkbox"
                                id="multi"
                                onChange={() =>
                                    setIsAddMultiple(!isAddMultiple)
                                }
                            />
                            <label
                                htmlFor="multi"
                                style={{
                                    userSelect: "none",
                                    marginLeft: "8px",
                                }}
                            >
                                Add multiple
                            </label>
                        </Opinion>
                    </FormRow>

                    <FormRow>
                        <Button
                            variation="secondary"
                            type="reset"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isLoadingCreate}>
                            Create schedule
                        </Button>
                    </FormRow>
                </Form>
            </StyledModal>
        </Overlay>
    );
}

export default ScheduleForm;

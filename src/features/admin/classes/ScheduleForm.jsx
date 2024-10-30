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

function ScheduleForm({ setModalOpen, currentScheduleSelect }) {
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: {},
    });
    const { errors } = formState;

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

    // const false = isLoadingCreate || isLoadingUpdate;
    function onSubmit(data) {
        const items = data.slot.split("-");
        const scheduleData = {
            slot: items[0],
            start_time: items[1],
            end_time: items[2],
            date: new Date(currentScheduleSelect.date),
            endDate: null,
        };
        // {
        //     "schedules": [
        //       {
        //         "slot": "1",
        //         "start_time": "07:00",
        //         "end_time": "08:30",
        //         "date": "2024-10-31T00:30:00.000Z",
        //         "endDate": null
        //       }
        //     ]
        //   }

        let schedules = {
            schedules: [scheduleData], // Wrap scheduleData in an array
        };
        console.log("schedules", schedules);

        createSchedule(
            { data: schedules, id: classId },
            {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                },
            }
        );

        // console.log("data", scheduleData);
        // if (isEditSession) {
        //     updateClass(
        //         {
        //             data,
        //             id: editId,
        //         },
        //         { onSuccess: () => onCloseModal?.() }
        //     );
        // } else
        //     createClass(
        //         { ...data },
        //         {
        //             onSuccess: () => {
        //                 reset();
        //                 onCloseModal?.();
        //             },
        //         }
        //     );
    }

    function onError(errors) {
        console.log(errors);
    }

    if (isLoadingCreate) return <Spinner />;
    // const filterTeachers = teachers
    //     .filter((teacher) => teacher.active)
    //     .map((teacher) => ({ value: teacher._id, label: teacher.name }));
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

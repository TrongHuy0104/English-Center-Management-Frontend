import styled from "styled-components";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";

const StyledConfirmEnroll = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmEnroll({ onConfirm, disabled, onCloseModal }) {
    return (
        <StyledConfirmEnroll>
            <Heading as="h3">Enroll in Class</Heading>
            <p>
                Are you sure you want to enroll in this class? You will be added to the class
                and notified of the schedule.
            </p>

            <div>
                <Button
                    variation="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    variation="primary"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Enroll
                </Button>
            </div>
        </StyledConfirmEnroll>
    );
}

export default ConfirmEnroll;

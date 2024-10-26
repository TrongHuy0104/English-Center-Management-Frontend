import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirm = styled.div`
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

function Confirm({ resourceName, onConfirm, disabled, onCloseModal }) {
    return (
        <StyledConfirm>
            <Heading as="h3">Enable {resourceName}</Heading>
            <p>
                Are you sure you want to enable this {resourceName} permanently?
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
                    onClick={() => {
                        onConfirm();
                        onCloseModal();
                    }}
                >
                    Enable
                </Button>
            </div>
        </StyledConfirm>
    );
}

export default Confirm;

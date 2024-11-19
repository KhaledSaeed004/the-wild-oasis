import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
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

    & span {
        color: var(--color-grey-900);
        font-weight: 600;
        text-transform: capitalize;
    }
`;

const DangerSpan = styled.span`
    color: var(--color-red-700) !important;
    text-transform: uppercase;
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, OnCloseModal }) {
    return (
        <StyledConfirmDelete>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
                Are you sure you want to <DangerSpan>delete</DangerSpan> this{" "}
                {resourceName} permanently?{" "}
                <span>This action cannot be undone.</span>
            </p>

            <div>
                <Button
                    variation="secondary"
                    disabled={disabled}
                    onClick={OnCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    variation="danger"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;

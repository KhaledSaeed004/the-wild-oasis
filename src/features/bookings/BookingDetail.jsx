import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking = {}, isLoading, error } = useBooking();
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const { checkOut, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const handleDeleteBooking = () => {
        deleteBooking(bookingId, { onSettled: () => moveBack() });
    };

    if (isLoading) return <Spinner />;

    if (!booking || error) return <Empty resourceName="booking" />;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status?.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Modal>
                    <Modal.OpenBtn opens="delete-bookingInDetailsPage">
                        <Button variation="danger">
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </Modal.OpenBtn>
                    <Modal.Window name="delete-bookingInDetailsPage">
                        <ConfirmDelete
                            resourceName={`Booking #${bookingId}`}
                            disabled={isDeleting}
                            onConfirm={handleDeleteBooking}
                        />
                    </Modal.Window>
                </Modal>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}
                {status === "checked-in" && (
                    <Button
                        onClick={() => {
                            checkOut(bookingId);
                        }}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? "Checking out..." : "Check out"}
                    </Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { PiDotsThreeVertical } from "react-icons/pi";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addedBreakfast, setAddedBreakfast] = useState(false);

    const { booking = {}, isLoading } = useBooking();
    const { checkIn, isCheckingIn } = useCheckin();
    const moveBack = useMoveBack();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const optionalBreakfastPrice =
        settings?.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addedBreakfast) {
            checkIn({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkIn({ bookingId, breakfast: {} });
        }
    }

    if (isLoading) return <Spinner />;

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    {isLoadingSettings ? (
                        <PiDotsThreeVertical />
                    ) : (
                        <Checkbox
                            checked={addedBreakfast}
                            onChange={() => {
                                setAddedBreakfast((prevVal) => !prevVal);
                            }}
                            id="breakfast"
                        >
                            Add breakfast for{" "}
                            {formatCurrency(optionalBreakfastPrice)}?
                        </Checkbox>
                    )}
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((prevVal) => !prevVal)}
                    disabled={booking.isPaid || isCheckingIn}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of {formatCurrency(totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    {isCheckingIn
                        ? "Checking in..."
                        : `Check in booking #${bookingId}`}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

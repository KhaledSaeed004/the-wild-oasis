import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEye,
    HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
        loading: "brand",
    };

    const navigate = useNavigate();
    const { checkOut, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag
                type={
                    isCheckingOut || isDeleting
                        ? statusToTagName["loading"]
                        : statusToTagName[status]
                }
            >
                {isCheckingOut
                    ? "Checking out..."
                    : isDeleting
                    ? "Deleting..."
                    : status.replace("-", " ")}
            </Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />

                    <Menus.List id={bookingId}>
                        <Menus.Item
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            See details
                        </Menus.Item>
                        {status === "checked-in" && (
                            <Menus.Item
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => {
                                    checkOut(bookingId);
                                }}
                            >
                                Check out
                            </Menus.Item>
                        )}
                        {status === "unconfirmed" && (
                            <Menus.Item
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                            >
                                Check in
                            </Menus.Item>
                        )}
                        <Modal.OpenBtn opens="delete-booking">
                            <Menus.Item icon={<HiTrash />}>Delete</Menus.Item>
                        </Modal.OpenBtn>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="delete-booking">
                    <ConfirmDelete
                        resourceName={`Booking #${bookingId}`}
                        onConfirm={() => deleteBooking(bookingId)}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;

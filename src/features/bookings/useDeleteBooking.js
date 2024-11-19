import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingFn } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: (bookingId) => deleteBookingFn(bookingId),
        onSuccess: () => {
            toast.success(`Booking successfully deleted`);

            queryClient.invalidateQueries({ active: true });
        },
        onError: (error) => {
            toast.error("Something went wrong while deleting the booking");
        },
    });

    return { deleteBooking, isDeleting };
}

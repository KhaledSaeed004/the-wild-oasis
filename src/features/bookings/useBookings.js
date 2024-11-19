import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGINATION_STEPS } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Filter
    const filterApplied = searchParams.get("status");
    const filter =
        !filterApplied || filterApplied === "all"
            ? null
            : { field: "status", value: filterApplied };

    // Sort
    const sortApplied = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortApplied.split("-");
    const sortBy = { field, direction };

    // Pagination
    const page = Number(searchParams.get("page")) || 1;

    const {
        data: { bookings, count } = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Prefetch next page
    const pagesCount = Math.ceil(count / PAGINATION_STEPS);

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    if (page < pagesCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    return { bookings, count, isLoading, error };
}

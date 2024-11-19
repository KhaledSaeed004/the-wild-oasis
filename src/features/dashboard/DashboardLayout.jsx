import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Statistics from "./Statistics";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const {
        bookings = [],
        isLoading: isLoadingBookings,
        numDays,
    } = useRecentBookings();
    const { confirmedStays = [], isLoading: isLoadingStays } = useRecentStays();
    const { cabins = [], isLoading: isLoadingCabins } = useCabins();

    // if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    //     return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Statistics
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins.length}
                loadingStates={{
                    isLoadingBookings,
                    isLoadingStays,
                    isLoadingCabins,
                }}
            />
            <TodayActivity />
            <DurationChart
                confirmedStays={confirmedStays}
                isLoading={isLoadingStays}
            />
            <SalesChart
                bookings={bookings}
                numDays={numDays}
                isLoading={isLoadingBookings}
            />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;

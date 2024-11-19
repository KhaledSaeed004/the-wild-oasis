import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Statistics({
    bookings,
    confirmedStays,
    numDays,
    cabinCount,
    loadingStates,
}) {
    // 1. Calculate the number of bookings
    const numBookings = bookings.length;

    // 2. Calculate total sales
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    // 3. Calculate the number of check-ins
    const checkIns = confirmedStays.length;

    // 4. Calculate the occupancy rate
    const occupiedCabinsByNights = confirmedStays.reduce(
        (acc, cur) => acc + cur.numNights,
        0
    );
    const totalNightsForAllCabins = numDays * cabinCount;
    const occupancyRate =
        (occupiedCabinsByNights / totalNightsForAllCabins) * 100;

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                isLoading={loadingStates["isLoadingBookings"]}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                isLoading={loadingStates["isLoadingBookings"]}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check-ins"
                color="indigo"
                isLoading={loadingStates["isLoadingStays"]}
                icon={<HiOutlineCalendarDays />}
                value={checkIns}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                isLoading={
                    loadingStates["isLoadingCabins"] ||
                    loadingStates["isLoadingStays"]
                }
                icon={<HiOutlineChartBar />}
                value={`${Math.round(occupancyRate)}%`}
            />
        </>
    );
}

export default Statistics;

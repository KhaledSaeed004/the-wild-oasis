import {
    HiOutlineHome,
    HiOutlineCalendarDays,
    HiOutlineHomeModern,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
} from "react-icons/hi2";

export const navItems = [
    {
        label: "Home",
        icon: HiOutlineHome,
        href: "/dashboard",
    },
    {
        label: "Bookings",
        icon: HiOutlineCalendarDays,
        href: "/bookings",
    },
    {
        label: "Cabins",
        icon: HiOutlineHomeModern,
        href: "/cabins",
    },
    {
        label: "Users",
        icon: HiOutlineUsers,
        href: "/users",
    },
    {
        label: "Settings",
        icon: HiOutlineCog6Tooth,
        href: "/settings",
    },
];

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome, HiUserGroup, HiEnvelopeOpen } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import {
    HiBanknotes,
    HiCurrencyDollar,
    HiClipboardDocumentCheck,
} from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import useUser from "../features/authentication/useUser";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

const navAdminList = [
    {
        title: "Home",
        route: "dashboard",
        icon: <HiOutlineHome />,
    },
    {
        title: "Admins",
        route: "admin",
        icon: <RiAdminFill />,
    },
    {
        title: "Students",
        route: "student",
        icon: <PiStudentDuotone />,
    },
    {
        title: "Users",
        route: "user",
        icon: <HiUserGroup />,
    },
    // {
    //     title: "Bookings",
    //     route: "booking",
    //     icon: <HiOutlineCalendarDays />,
    // },
    // {
    //     title: "Cabins",
    //     route: "cabin",
    //     icon: <HiOutlineCalendarDays />,
    // },
    {
        title: "Classes",
        route: "class",
        icon: <MdOutlineClass />,
    },
    {
        title: "Fee",
        route: "fees",
        icon: <HiBanknotes />,
    },
    {
        title: "Salary",
        route: "salaries",
        icon: <HiCurrencyDollar />,
    },
    {
        title: "Profile",
        route: "users",
        icon: <HiOutlineUsers />,
    },
];

const navTeacherList = [
    {
        title: "Home",
        route: "dashboard",
        icon: <HiOutlineHome />,
    },
    {
        title: "Attendance",
        route: "teacher/attendance",
        icon: <HiOutlineClipboardDocumentCheck />,
    },

    {
        title: "Schedule",
        route: "teacher/schedule",
        icon: <HiOutlineCalendarDays />,
    },
    {
        title: "Messages",
        route: "teaher/messages",
        icon: <HiEnvelopeOpen />,
    },
    {
        title: "Profile",
        route: "teacher/profile",
        icon: <HiOutlineUsers />,
    },
];
const navStudentList = [
    {
        title: "My CLass",
        route: "student/my-class",
        icon: <HiOutlineCalendarDays />,
    },
    {
        title: "Attendance",
        route: "student/attendance",
        icon: <HiClipboardDocumentCheck />,
    },
    {
        title: "Fees",
        route: "student/fees",
        icon: <HiCurrencyDollar />,
    },

    {
        title: "Messages",
        route: "student/messages",
        icon: <HiEnvelopeOpen />,
    },
];

// const navTeacherList = [];

function MainNav() {
    const { user } = useUser();
    let navList;
    if (user.user?.role === "admin") navList = navAdminList;
    if (user.user?.role === "teacher") navList = navTeacherList;
    if (user.user?.role === "student") navList = navStudentList;
    return (
        <nav>
            <NavList>
                {navList?.map((navItem) => (
                    <li key={navItem.title + navItem.route}>
                        <StyledNavLink to={navItem.route}>
                            {navItem.icon}
                            <span>{navItem.title}</span>
                        </StyledNavLink>
                    </li>
                ))}
            </NavList>
        </nav>
    );
}

export default MainNav;

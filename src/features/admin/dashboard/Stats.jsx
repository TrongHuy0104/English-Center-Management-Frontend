import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Stat from "./Stat";
import styled from "styled-components";

const StyledDashStats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 17rem 17rem;
    gap: 2.4rem;
`;

function Stats({ students, classes, teachers, admins }) {
    return (
        <StyledDashStats>
            <Stat
                icon={<FaChalkboardTeacher />}
                title="Teachers"
                color="blue"
                value={teachers}
            />
            <Stat
                icon={<PiStudent />}
                title="Students"
                color="green"
                value={students}
            />
            <Stat
                icon={<MdOutlineClass />}
                title="Classes"
                color="indigo"
                value={classes}
            />
            <Stat
                icon={<RiAdminLine />}
                title="Admins"
                color="yellow"
                value={admins}
            />
        </StyledDashStats>
    );
}

export default Stats;

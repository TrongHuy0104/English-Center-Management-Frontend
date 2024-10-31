import styled from "styled-components";
import Heading from "../../../ui/Heading";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const StyledClassTypeChart = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 2.4rem 3.2rem;
    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

const startDataLight = [
    {
        _id: "Level 1",
        value: 0,
        color: "#ef4444",
    },
    {
        _id: "Level 2",
        value: 0,
        color: "#f97316",
    },
    {
        _id: "Level 3",
        value: 0,
        color: "#eab308",
    },
    {
        _id: "Level 4",
        value: 0,
        color: "#84cc16",
    },
    {
        _id: "Level 5",
        value: 0,
        color: "#22c55e",
    },
    {
        _id: "Level 6",
        value: 0,
        color: "#14b8a6",
    },
    {
        _id: "Level 7",
        value: 0,
        color: "#3b82f6",
    },
];

const startDataDark = [
    {
        _id: "Level 1",
        value: 0,
        color: "#b91c1c",
    },
    {
        _id: "Level 2",
        value: 0,
        color: "#c2410c",
    },
    {
        _id: "Level 3",
        value: 0,
        color: "#a16207",
    },
    {
        _id: "Level 4",
        value: 0,
        color: "#4d7c0f",
    },
    {
        _id: "Level 5",
        value: 0,
        color: "#15803d",
    },
    {
        _id: "Level 6",
        value: 0,
        color: "#0f766e",
    },
    {
        _id: "Level 7",
        value: 0,
        color: "#1d4ed8",
    },
];

function updateData(data, newData) {
    // Create a map for easier lookups
    const newDataMap = newData.reduce((acc, item) => {
        acc[item._id] = item.value;
        return acc;
    }, {});

    // Update startDataLight values
    return data.map((level) => {
        if (newDataMap[level._id] !== undefined) {
            return { ...level, value: newDataMap[level._id] };
        }
        return level; // return the original if no update
    });
}

function ClassTypeChart({ classType }) {
    const data = updateData(startDataLight, classType);

    return (
        <StyledClassTypeChart>
            <Heading as="h2">Class type</Heading>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        nameKey="_id"
                        valueKey="value"
                        innerRadius={85}
                        outerRadius={110}
                        cx="40%"
                        cy="50%"
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="middle"
                        layout="vertical"
                        align="right"
                        width="30%"
                        iconSize={15}
                    />
                </PieChart>
            </ResponsiveContainer>
        </StyledClassTypeChart>
    );
}

export default ClassTypeChart;

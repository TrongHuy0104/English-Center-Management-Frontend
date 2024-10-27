import styled from "styled-components";
import React from "react";

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 1rem 1.2rem;
    border: 1px solid
        ${(props) =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const Select = React.forwardRef(function Select(
    { options, value, onChange, ...props },
    ref
) {
    return (
        <StyledSelect ref={ref} {...props} onChange={onChange} value={value}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
});

// Optionally set a display name
Select.displayName = "Select";

export default Select;

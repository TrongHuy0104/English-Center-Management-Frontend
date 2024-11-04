import styled from "styled-components";
import React from "react";
import { Select } from "antd";

const StyledSelect = styled(Select)`
    font-size: 1.4rem;
    height: 4rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
`;

const MultipleSelect = React.forwardRef(function Select(
    { options, value, onChange, ...props },
    ref
) {
    return (
        <StyledSelect
            ref={ref}
            {...props}
            onChange={onChange}
            value={value}
            options={options}
            mode="multiple"
            placeholder="Select center(s)..."
        />
    );
});

// Optionally set a display name
MultipleSelect.displayName = "MultipleSelect";

export default MultipleSelect;

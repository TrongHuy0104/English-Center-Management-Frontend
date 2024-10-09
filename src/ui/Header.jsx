import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    padding-bottom: 1px solid var() (--color-grey-100);
    border: 1px solid var(--color-grey-100);

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;
`;

function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;

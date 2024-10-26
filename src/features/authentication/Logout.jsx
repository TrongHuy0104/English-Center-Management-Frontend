import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
    const logout = useLogout();
    return (
        <ButtonIcon onClick={() => logout()}>
            {/* {isLoading ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />} */}
            <HiArrowRightEndOnRectangle />
        </ButtonIcon>
    );
}

export default Logout;

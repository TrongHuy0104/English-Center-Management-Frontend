import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
    // useEffect(() => {
    //     function handleCloseModal(e) {
    //         if (ref.current && !ref.current.contains(e.target)) {
    //             handler();
    //         }
    //     }
    //     document.addEventListener("click", handleCloseModal, listenCapturing);
    //     return () =>
    //         document.removeEventListener(
    //             "click",
    //             handleCloseModal,
    //             listenCapturing
    //         );
    // }, [handler, listenCapturing]);

    return { ref };
}

export default useOutsideClick;

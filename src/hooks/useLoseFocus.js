import { useEffect, useRef } from "react";

export function useLoseFocus({ onClickAway, preventbubbling = true }) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickAway = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClickAway();
            }
        };

        const handleDismiss = (e) => {
            if (e.key === "Escape") {
                if (ref.current) {
                    onClickAway();
                }
            }
        };

        document.addEventListener("click", handleClickAway, preventbubbling);
        document.addEventListener("keydown", handleDismiss, preventbubbling);

        return () => {
            document.removeEventListener(
                "click",
                handleClickAway,
                preventbubbling
            );
            document.removeEventListener(
                "keydown",
                handleDismiss,
                preventbubbling
            );
        };
    }, [onClickAway, preventbubbling]);

    return { ref };
}

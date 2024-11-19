import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutFn } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutFn,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    return { logout, isLoading };
}

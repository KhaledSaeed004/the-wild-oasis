import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginFn } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginFn({ email, password }),
        onSuccess: (data) => {
            toast.success("Login successful");
            queryClient.setQueryData(["user"], data.user);
            navigate("/dashboard");
        },
        onError: () => {
            toast.error("Email or password is incorrect");
        },
    });

    return { login, isLoading };
}

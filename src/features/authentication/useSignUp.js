import { useMutation } from "@tanstack/react-query";
import { signup as signUpFn } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signUpFn,
        onSuccess: ({ user }) => {
            console.log(user);
            toast.success(
                `Account successfully created! Please check email: ${user.email} to verify the account.`
            );
        },
        onError: () => {
            toast.error("An error occurred. Please try again.");
        },
    });

    return { signUp, isLoading };
}

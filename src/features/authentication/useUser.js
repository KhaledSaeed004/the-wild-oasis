import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../services/apiAuth";

export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getAuthenticatedUser,
    });

    return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

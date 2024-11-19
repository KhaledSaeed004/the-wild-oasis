import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserSettings as updateUserSettingsFn } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUserSettings, isLoading: isUpdating } = useMutation({
        mutationFn: ({ fullName, password, avatar }) =>
            updateUserSettingsFn({ fullName, password, avatar }),
        onSuccess: () => {
            toast.success("User settings updated successfully");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateUserSettings, isUpdating };
}

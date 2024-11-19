import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { fullName, avatar: "" },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getAuthenticatedUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateUserSettings({ fullName, password, avatar }) {
    if (avatar) {
        // check that image size is less than 1MB
        if (avatar.size > 1024 * 1024)
            throw new Error("Image size must be less than 1MB");
    }

    // 1. Update user name OR password
    let updatedSettings;
    if (fullName) updatedSettings = { data: { fullName } };
    if (password) updatedSettings = { password };

    const { data, error } = await supabase.auth.updateUser(updatedSettings);

    if (error) throw new Error(error.message);

    if (!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. update user avatar
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
    const { data: updatedUser, error: avatarError } =
        await supabase.auth.updateUser({ data: { avatar: avatarUrl } });

    if (avatarError) throw new Error(avatarError.message);

    return updatedUser;
}

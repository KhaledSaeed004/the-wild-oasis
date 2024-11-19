import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return cabins;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        "_"
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase.from("cabins");

    // A) Create new cabin
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Edit existing cabin
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error(`Cabin ${newCabin.name} could not be created`);
    }

    // 2. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Terminate process if image upload failed
    if (storageError) {
        deleteCabin(data.id);
        console.error(storageError);
        throw new Error(
            `Cabin ${newCabin.name} image could not be uploaded & cabin was not created`
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error(`Cabin ${id} could not be deleted`);
    }
}

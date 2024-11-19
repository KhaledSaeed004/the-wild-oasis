import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, OnCloseModal }) {
    const { id: editedCabinId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editedCabinId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { createCabin, isCreating } = useCreateCabin();

    const { editCabin, isEditing } = useEditCabin();

    const isProcessing = isCreating || isEditing;

    const onSubmit = (data) => {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, image }, id: editedCabinId },
                {
                    onSuccess: () => {
                        reset();
                        OnCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                { ...data, image },
                {
                    onSuccess: () => {
                        reset();
                        OnCloseModal?.();
                    },
                }
            );
    };

    // eslint-disable-next-line no-unused-vars
    const onError = (errors) => {
        // console.log(errors);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={OnCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isProcessing}
                    {...register("name", {
                        required: "Please fill out this required field",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isProcessing}
                    {...register("maxCapacity", {
                        required: "Please fill out this required field",
                        min: {
                            value: 1,
                            message: "Minimum capacity is 1",
                        },
                        max: {
                            value: 10,
                            message: "Maximum capacity is 10",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isProcessing}
                    {...register("regularPrice", {
                        required: "Please fill out this required field",
                        min: {
                            value: 1,
                            message: "Cabin price must be at least $1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isProcessing}
                    defaultValue={0}
                    {...register("discount", {
                        required: "Please fill out this required field",
                        validate: (value) => {
                            const discount = parseFloat(value);
                            const regularPrice = parseFloat(
                                getValues().regularPrice
                            );
                            return (
                                discount < regularPrice ||
                                "Discount must be less than regular price"
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isProcessing}
                    defaultValue=""
                    {...register("description", {
                        required: "Please fill out this required field",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "Please fill out this required field",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => OnCloseModal?.()}
                >
                    Cancel
                </Button>
                {isEditSession ? (
                    <Button disabled={isProcessing}>
                        {isProcessing ? <SpinnerMini /> : "Update cabin"}
                    </Button>
                ) : (
                    <Button disabled={isProcessing}>
                        {isProcessing ? <SpinnerMini /> : "Create cabin"}
                    </Button>
                )}
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

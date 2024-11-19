import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin created successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data) => {
        // console.log(data);
        mutate({ ...data, image: data.image[0] });
    };

    const onError = (errors) => {
        // console.log(errors);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                        required: "Please fill out this required field",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>
                    {isCreating ? <SpinnerMini /> : "Add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { signUp, isLoading } = useSignUp();

    const { register, reset, formState, getValues, handleSubmit } = useForm();
    const { errors } = formState;

    const onSubmit = ({ fullName, email, password }) => {
        signUp({ fullName, email, password }, { onSettled: reset });
    };

    const onError = () => {};

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", {
                        required: "Please fill out this required field",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "Please fill out this required field",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please type a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Password" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "Please fill out this required field",
                        minLength: {
                            value: 8,
                            message:
                                "Password should have a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Re-type password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "Please fill out this required field",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isLoading}
                    onClick={reset}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>
                    {isLoading ? <SpinnerMini /> : "Create new user"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;

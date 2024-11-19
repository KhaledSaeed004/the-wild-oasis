import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
    const [settingBeingUpdated, setSettingBeingUpdated] = useState(null);
    const { settings = {}, isLoading } = useSettings();
    const { updateSetting, isUpdating } = useUpdateSetting();

    const {
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
    } = settings;

    const handleUpdateSetting = (name, value) => {
        if (!value) return;
        if (parseFloat(value) === settings[name]) return;
        setSettingBeingUpdated(name);
        updateSetting({ [name]: value });
    };

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdateSetting("minBookingLength", e.target.value)
                    }
                />
                {isUpdating && settingBeingUpdated === "minBookingLength" && (
                    <span>Saving...</span>
                )}
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdateSetting("maxBookingLength", e.target.value)
                    }
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdateSetting(
                            "maxGuestsPerBooking",
                            e.target.value
                        )
                    }
                />
                {isUpdating &&
                    settingBeingUpdated === "maxGuestsPerBooking" && (
                        <span>Saving...</span>
                    )}
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdateSetting("breakfastPrice", e.target.value)
                    }
                />
                {isUpdating && settingBeingUpdated === "breakfastPrice" && (
                    <span>Saving...</span>
                )}
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;

import { useForm } from "react-hook-form";

import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FileInput from "../../../ui/FileInput";
import Textarea from "../../../ui/Textarea";
import FormRow from "../../../ui/FormRow";
// import useCreateCabin from "./useCreateCabin";
// import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    // const { createCabin, isCreating } = useCreateCabin();
    // const { editCabin, isEditing } = useEditCabin();
    // const queryClient = useQueryClient();
    // const { mutate: createCabin, isPending: isCreating } = useMutation({
    //     mutationFn: createEditCabin,
    //     onSuccess: () => {
    //         toast.success("Create cabin successfully");
    //         queryClient.invalidateQueries({
    //             queryKey: ["cabin"],
    //         });
    //         reset();
    //     },
    //     onError: () => {
    //         toast.error("Create cabin failed");
    //     },
    // });

    // const { mutate: editCabin, isPending: isEditing } = useMutation({
    //     mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    //     onSuccess: () => {
    //         toast.success("Edit cabin successfully");
    //         queryClient.invalidateQueries({
    //             queryKey: ["cabin"],
    //         });
    //         // reset();
    //     },
    //     onError: (error) => {
    //         toast.error("Edit cabin failed");
    //     },
    // });

    const isWorking = false;

    function onSubmit(data) {
        // const image =
        //     typeof data.image === "string" ? data.image : data.image[0];
        // if (isEditSession) {
        //     editCabin(
        //         { newCabinData: { ...data, image }, id: editId },
        //         { onSuccess: (data) => onCloseModal?.() }
        //     );
        // } else
        //     createCabin(
        //         { ...data, image: image },
        //         {
        //             onSuccess: (data) => {
        //                 reset();
        //                 onCloseModal?.();
        //             },
        //         }
        //     );
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                        pattern: {
                            value: /^(?!\s*$).+/,
                            message: "Please enter a valid name",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            +value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

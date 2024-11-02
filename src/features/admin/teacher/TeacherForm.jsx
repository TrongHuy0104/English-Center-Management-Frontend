import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import Select from "../../../ui/Select";
import useCreateTeacher from "./useCreateTeacher";
import useUpdateTeacher from "./useUpdateTeacher";
import useClass from "./useClass";

function TeacherForm({ TeacherToEdit = {}, onCloseModal }) {
  let editId, editValues;

  if (Object.keys(TeacherToEdit).length) {
    editId = TeacherToEdit._id;
    editValues = {
      name: TeacherToEdit.name,
      phone: TeacherToEdit.phone,
      gender: TeacherToEdit.gender,
      email: TeacherToEdit.user[0]?.email, // Get email from the first user object
      shiftPay: TeacherToEdit.shiftPay,
    };
  }

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const { isLoadingCreate, createTeacher } = useCreateTeacher();
  const { isLoadingUpdate, updateTeacher } = useUpdateTeacher();
  const { classes, isLoading } = useClass();
  const classData = classes?.data?.data?.data;

  const isWorking = isLoadingCreate || isLoadingUpdate;
  function onSubmit(data) {
    if (isEditSession) {
      updateTeacher(
        {
          data: { ...data, userId: TeacherToEdit.user[0]?._id },
          id: editId,
        },
        { onSuccess: () => onCloseModal?.() }
      );
    } else
      createTeacher(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  // Map the class data to an array of options for the Select component
  const classOptions = classData?.map((classItem) => ({
    value: classItem._id,
    label: classItem.name,
  }));

  let genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    {
      value: "other",
      label: "Other",
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Teacher name" error={errors?.name?.message}>
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

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      {/* New Multi-Select Input for Class Data */}
      <FormRow label="Classes" error={errors?.classes?.message}>
        <Select
          id="classes"
          options={classOptions || []}
          multiple // This enables multiple selection
          {...register("classes")}
          disabled={isWorking || isLoading}
          style={{ width: "70%" }}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="phone"
          id="phone"
          {...register("phone", {
            pattern: {
              value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              message: "Please enter a valid phone number",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Shift Pay" error={errors?.shiftPay?.message}>
        <Input
          type="number"
          id="shiftPay"
          {...register("shiftPay", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Shift pay must be a positive number",
            },
          })}
          disabled={isWorking}
          style={{ width: "70%" }}
        />
      </FormRow>

      <FormRow label="Gender" error={errors?.gender?.message}>
        <Select
          id="gender"
          options={genderOptions}
          style={{ width: "70%" }}
          {...register("gender")}
          disabled={isWorking}
        />
      </FormRow>

      {!isEditSession && (
        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Please enter a valid password at least 8 characters",
              },
            })}
            disabled={isWorking}
          />
        </FormRow>
      )}

      {!isEditSession && (
        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
            disabled={isWorking}
          />
        </FormRow>
      )}

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit teacher" : "Create teacher"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default TeacherForm;

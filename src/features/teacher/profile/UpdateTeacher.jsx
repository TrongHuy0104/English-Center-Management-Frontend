import { useState, useEffect } from "react"; // Import useEffect
import useUser from "../../authentication/useUser";
import useUpdateTeacher from "./useUpdateTeacher";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";

function UpdateTeacherProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const teacherId = user.roleDetails._id;
  const { updateTeacher, isUpdating } = useUpdateTeacher(teacherId);

  const [formData, setFormData] = useState({
    name: user.roleDetails.name || "",
    phone: user.roleDetails.phone || "",
    gender: user.roleDetails.gender || "",
    dateOfBirth: user.roleDetails.dateOfBirth?.split("T")[0] || "",
  });

  const [hasChanges, setHasChanges] = useState(false); 


  useEffect(() => {
    setHasChanges(
      formData.name !== user.roleDetails.name ||
      formData.phone !== user.roleDetails.phone ||
      formData.gender !== user.roleDetails.gender ||
      formData.dateOfBirth !== user.roleDetails.dateOfBirth?.split("T")[0]
    );
  }, [formData, user.roleDetails]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!hasChanges) {
      return; 
    }

    try {
      await updateTeacher(formData);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., show an error message)
    }
  };

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <Form onSubmit={handleSubmit} >
      <FormRow label="Name">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow label="Phone">
        <Input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow label="Gender">
        <select
          style={{
            height: "40px",
            borderRadius: "var(--border-radius-sm)",
            border: "1px solid var(--color-grey-300)",
            padding: "0.8rem 1.2rem",
            marginLeft: "-100px"
          }}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </FormRow>
      <FormRow label="Date of Birth">
        <Input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </FormRow>

      <Button type="submit" disabled={isUpdating || !hasChanges} style={{
            marginTop: "20px",
            position: "relative",
            left: "700px"
          }} >
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
    </Form>
  );
}

export default UpdateTeacherProfile;

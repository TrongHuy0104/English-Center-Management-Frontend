import { useEffect, useState } from "react";
import useUser from "../features/authentication/useUser";
import { updateStudent } from "../services/apiStudent";
import useStudent from "../features/student/useStudent";
import "../styles/StudentProfile.css";
import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";

function StudentProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const { isLoading: isLoadingStudent, student } = useStudent(user._id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    center: "",
    className: "",
  });

  const [notification, setNotification] = useState(""); // State cho thông báo

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        phone: student.phone || "",
        gender: student.gender || "",
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        center: student.centers || "",
        className: student.classes || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(""); // Reset thông báo trước khi cập nhật

    try {
      await updateStudent(user._id, formData);
      setNotification("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification("Failed to update profile.");
    }
  };

  if (isLoadingUser || isLoadingStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Student Profile</h1>
          <Button type="submit">Update Profile</Button>
        </div>
        <div className="container">
          <FormRow>
            <label>Name:</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>Phone:</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FormRow>
          <FormRow>
            <label>Date of Birth:</label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <label>Center:</label>
            <Input
              type="text"
              name="center"
              value={formData.center}
              onChange={handleChange}
              readOnly
            />
          </FormRow>
          <FormRow>
            <label>Class Name:</label>
            <Input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              readOnly
            />
          </FormRow>
          {notification && <p>{notification}</p>}
        </div>
      </Form>
    </div>
  );
}

export default StudentProfile;

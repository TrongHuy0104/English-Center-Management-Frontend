import { useNavigate } from "react-router-dom";
import useUser from "../../authentication/useUser";
import useTeacherSalary from "../profile/useTeacherSalary";
import useTeacherCenter from "../profile/useTeacherCenter";
import "../../../styles/TeacherProfile.css";
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";
import Button from "../../../ui/Button";

function TeacherProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const teacherId = user?.roleDetails?._id;

  const { isLoading: isLoadingSalary, salary } = useTeacherSalary(teacherId);
  const { isLoading: isLoadingCenter, center } = useTeacherCenter(teacherId);
  const navigate = useNavigate();

  // Navigate to update profile page
  const handleUpdate = () => {
    navigate("update-profile");
  };

  // Handle loading states
  if (isLoadingUser || isLoadingSalary || isLoadingCenter) {
    return <div>Loading...</div>;
  }

  // Render the profile details
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button className="button1" onClick={handleUpdate}>
          Update Profile
        </Button>
      </div>
      <div className="form-content">
        <div className="avatar">
          <div className="form-content__avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGBcKAZtzJFFI4jhSgqrXvgrMnfGQNNdCyr3Ho64RgWgOalZG9R9M5XBEDo9Kv4H0SSds&usqp=CAU"
              alt="Teacher Avatar"
            />
          </div>
          <Button className="button" type="submit" style={{ margin: "auto" }}>
            Update Avatar
          </Button>
        </div>
        <div className="container">
          <FormRow>
            <label>Name:</label>
            <Input type="text" name="name" value={user.roleDetails.name} readOnly />
          </FormRow>
          <FormRow>
            <label>Phone:</label>
            <Input type="text" name="phone" value={user.roleDetails.phone} readOnly />
          </FormRow>
          <FormRow>
            <label>Gender:</label>
            <Input type="text" name="gender" value={user.roleDetails.gender} readOnly />
          </FormRow>
          <FormRow>
            <label>Date of Birth:</label>
            <Input
              type="date"
              name="dateOfBirth"
              value={user.roleDetails.dateOfBirth.split("T")[0]}
              readOnly
            />
          </FormRow>
          <FormRow>
            <label>Salary:</label>
            <Input
              type="text"
              name="salary"
              value={salary ? salary.data[0].calculatedSalary : "N/A"}
              readOnly
            />
          </FormRow>
          <FormRow>
            <label>Centers:</label>
            <Input
              type="text"
              name="centers"
              value={center ? center.data.map((c) => c.name).join(", ") : "N/A"}
              readOnly
            />
          </FormRow>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;

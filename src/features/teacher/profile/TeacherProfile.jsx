import useUser from "../../authentication/useUser";
import useTeacherSalary from "./useTeacherSalary";
import useTeacherCenter from "./useTeacherCenter";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import for navigation

// Styled-components
const ProfileContainer = styled.div`
  width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc; /* Add border style */
`;

const TeacherDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeacherInfo = styled.p`
  font-size: 1em;
  color: #333;
  margin-bottom: 10px;

  span {
    font-weight: bold;
    margin-right: 10px;
  }
`;

function TeacherProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const teacherId = user?.roleDetails?._id; // Use optional chaining
  const { isLoading: isLoadingSalary, salary } = useTeacherSalary(teacherId);
  const { isLoading: isLoadingCenter, center } = useTeacherCenter(teacherId);
  const navigate = useNavigate(); // Use navigate to redirect

  const handleUpdate = () => {
    navigate("update-profile"); // Correct the path here
  };
   console.log("User Role:", user.roleDetails);

  if (isLoadingUser || isLoadingSalary || isLoadingCenter) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      {user ? (
        <>
          <TeacherDetails>
            <TeacherInfo>Name: {user.roleDetails.name}</TeacherInfo>
            <TeacherInfo>Phone: {user.roleDetails.phone}</TeacherInfo>
            <TeacherInfo>Gender: {user.roleDetails.gender}</TeacherInfo>
            <TeacherInfo>
              Date of Birth: {user.roleDetails.dateOfBirth.split("T")[0]}
            </TeacherInfo>
            <TeacherInfo>Salary: {salary.data[0].calculatedSalary}</TeacherInfo>

            {center.data.map((centerItem, index) => (
              <div key={index}>
                <TeacherInfo>Center: {centerItem.name}</TeacherInfo>
                <TeacherInfo>Location: {centerItem.location}</TeacherInfo>
              </div>
            ))}
          </TeacherDetails>

          <Button onClick={handleUpdate}>Update Profile</Button>
        </>
      ) : (
        <TeacherInfo>No teacher data available.</TeacherInfo>
      )}
    </ProfileContainer>
  );
}

export default TeacherProfile;

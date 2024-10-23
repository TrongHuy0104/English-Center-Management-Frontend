// src/pages/FeesPage.jsx
import UpdateTeacherProfile from "../features/teacher/profile/UpdateTeacher";
import Row from "../ui/Row";


function UpdateProfilePage() {
  return (
    <>
      <Row type="horizontal">
        <h2>Update Profile</h2>
      </Row>
      <UpdateTeacherProfile/>
    </>
  );
}

export default UpdateProfilePage;
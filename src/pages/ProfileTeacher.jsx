// src/pages/FeesPage.jsx
import TeacherProfile from "../features/teacher/profile/TeacherProfile";
import Row from "../ui/Row";


function ProfilePage() {
  return (
    <>
      <Row type="horizontal">
        <h2>TeacherProfile</h2>
      </Row>
      <TeacherProfile/>
    </>
  );
}

export default ProfilePage;
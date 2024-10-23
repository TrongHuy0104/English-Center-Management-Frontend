import { useEffect, useState } from "react";
import useUser from "../features/authentication/useUser";
import {
  updateStudent,
  getCenterById,
  getClassById,
} from "../services/apiStudent";
import "../styles/StudentProfile.css";
import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import Heading from "../ui/Heading";

function StudentProfile() {
  const { isLoading: isLoadingUser, user } = useUser();
  const studentId = user?.roleDetails?._id;
  const centers = user?.roleDetails?.centers || [];
  const classes = user?.roleDetails?.classes || [];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    centers: "",
    className: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isFormDataLoaded, setIsFormDataLoaded] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchCenterAndClassNames = async () => {
      try {
        if (!user || !user.roleDetails) {
          console.log("User or roleDetails not available yet.");
          return;
        }
        const centerNames = [];
        for (const centerId of centers) {
          try {
            console.log("Fetching center data for ID:", centerId);
            const centerData = await getCenterById(centerId);
            centerNames.push(centerData.data.centers.name || "Unknown Center");
          } catch (error) {
            console.error(
              `Error fetching center name for ID ${centerId}:`,
              error
            );
            centerNames.push("Center Not Found");
          }
        }

        const classNames = [];
        for (const classId of classes) {
          try {
            const classData = await getClassById(classId);
            classNames.push(classData.data.classes.name || "Unknown Class");
          } catch (error) {
            console.error(
              `Error fetching class name for ID ${classId}:`,
              error
            );
            classNames.push("Class Not Found");
          }
        }

        const initialData = {
          name: user.roleDetails.name || "",
          phone: user.roleDetails.phone || "",
          gender: user.roleDetails.gender || "",
          dateOfBirth: user.roleDetails.dateOfBirth
            ? user.roleDetails.dateOfBirth.split("T")[0]
            : "",
          centers: centerNames.join(", "),
          className: classNames.join(", "),
        };

        setFormData(initialData);
        setOriginalData(initialData);
        setIsFormDataLoaded(true);
      } catch (error) {
        console.error("Error fetching centers or classes:", error);
      }
    };

    if (user) {
      fetchCenterAndClassNames();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification("");

    try {
      await updateStudent(studentId, formData);
      setOriginalData(formData);
      setNotification("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification("Failed to update profile.");
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  if (isLoadingUser || !isFormDataLoaded) {
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
          <Heading as="h1">Student Profile</Heading>
          {hasChanges && <Button type="submit">Update Profile</Button>}
        </div>
        <div className="form-content">
          <div className="avata">
            <div className="form-content__avatar">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGBcKAZtzJFFI4jhSgqrXvgrMnfGQNNdCyr3Ho64RgWgOalZG9R9M5XBEDo9Kv4H0SSds&usqp=CAU" />
            </div>
            <Button className="button" type="submit" style={{ margin: "auto" }}>
              Update Avatar
            </Button>
          </div>
          <div className="form-content">
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
                <label>Center(s):</label>
                <Input
                  type="text"
                  name="centers"
                  value={formData.centers}
                  readOnly
                />
              </FormRow>
              <FormRow>
                <label>Class Name(s):</label>
                <Input
                  type="text"
                  name="className"
                  value={formData.className}
                  readOnly
                />
              </FormRow>
              {notification && <p>{notification}</p>}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default StudentProfile;

import useUser from "../features/authentication/useUser";
import { useState, useEffect, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";
import { updateStudent, uploadAvatar } from "../services/apiStudent";
import useClass from "../features/student/useClass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Heading from "../ui/Heading";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const StudentProfile = () => {
  const { isLoading: isLoadingUser, user } = useUser();
  const [imageURL, setImageURL] = useState(DEFAULT_AVATAR);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const { classes } = useClass(user?.roleDetails?.classes);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.roleDetails.name || "",
        phone: user.roleDetails.phone || "",
        gender: user.roleDetails.gender || "",
        dateOfBirth: user.roleDetails.dateOfBirth
          ? formatDate(user.roleDetails.dateOfBirth)
          : "",
      });
      setImageURL(user.roleDetails.avatar || DEFAULT_AVATAR);
    }
  }, [user]);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }

  function handleEditAvatar() {
    fileInputRef.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  }

  async function handleSave() {
    try {
      let avatarUrl = imageURL;
      if (selectedImage) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `avatars/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        avatarUrl = await getDownloadURL(storageRef);

        await uploadAvatar(user.roleDetails._id, avatarUrl);
      }

      await updateStudent(user.roleDetails._id, {
        ...formData,
        avatar: avatarUrl,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  }

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading as="h1">Student Profile</Heading>
        <Button
          type="button"
          onClick={handleSave}
          style={{
            color: "white",
          }}
        >
          Update Profile
        </Button>
      </div>
      <ToastContainer position="top-right" />
      <div
        style={{
          backgroundColor: "#fff",
          padding: "8px 20px",
          borderRadius: "8px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "120px", marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginLeft: "50%",
                  transform: "translateX(-50%)",
                  cursor: "pointer",
                }}
                src={imageURL}
                alt="avatar"
                onClick={handleEditAvatar}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <h3
                style={{
                  color: "#000",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {formData.name}
              </h3>
            </div>
          </div>

          <div style={{ width: "100%", marginBottom: "10px" }}>
            <form>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <label style={{ marginRight: "100px", width: "15%" }}>
                  Name
                </label>
                <input
                  style={{
                    width: "50%",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #d1d5db",
                  }}
                  type="text"
                  value={formData.name}
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <label style={{ marginRight: "100px", width: "15%" }}>
                  Phone
                </label>
                <input
                  style={{
                    width: "50%",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #d1d5db",
                  }}
                  type="text"
                  value={formData.phone}
                  id="phone"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <label style={{ marginRight: "100px", width: "15%" }}>
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={options}
                  style={{ width: "50%", padding: "12px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <label style={{ marginRight: "100px", width: "15%" }}>
                  Date Of Birth
                </label>
                <input
                  style={{
                    width: "50%",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #d1d5db",
                  }}
                  type="text"
                  value={formData.dateOfBirth}
                  id="dateOfBirth"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                }}
              >
                <label style={{ marginRight: "100px", width: "15%" }}>
                  Class(s)
                </label>
                <input
                  style={{
                    width: "50%",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "1px solid #d1d5db",
                  }}
                  type="text"
                  value={classes
                    .map((classItem) => classItem.data.classes.name)
                    .join(",")}
                  id="class"
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

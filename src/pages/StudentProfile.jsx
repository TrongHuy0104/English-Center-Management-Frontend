import { useState, useEffect, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Heading from "../ui/Heading";
import useStudent from "../features/student/profiles/useStudent";
import useUser from "../features/authentication/useUser";
import useClass from "../features/student/profiles/useClass";
import defaultAvatar from "../../public/img/default-user.jpg";
import { updateStudent, uploadAvatar } from "../services/apiStudent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
    const { user } = useUser();
    const { formData, setFormData } = useStudent(user);
    const { classes } = useClass(user.roleDetails.classes);

    const [imageURL, setImageURL] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const [localFormData, setLocalFormData] = useState(formData);

    useEffect(() => {
        setLocalFormData(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLocalFormData((prev) => ({ ...prev, [id]: value }));
    };

    const options = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

    function handleEditAvatar() {
        fileInputRef.current.click();
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const newImageURL = URL.createObjectURL(file);
            setImageURL(newImageURL);
            setSelectedImage(file);

            setLocalFormData((prevData) => ({
                ...prevData,
                avatar: newImageURL,
            }));
        }
    }

    async function handleSave() {
        try {
            let avatarUrl = imageURL;

            if (selectedImage) {
                const storage = getStorage(app);
                const storageRef = ref(
                    storage,
                    `avatars/${selectedImage.name}`
                );
                await uploadBytes(storageRef, selectedImage);
                avatarUrl = await getDownloadURL(storageRef);

                await uploadAvatar(user.roleDetails._id, avatarUrl);
            }

            await updateStudent(user.roleDetails._id, {
                ...localFormData,
                avatar: avatarUrl,
            });

            toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile.");
        }
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
                    type="submit"
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
                <div
                    style={{ display: "flex", gap: "120px", marginTop: "10px" }}
                >
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
                                height: "60vh",
                                display: "flex",
                                justifyContent: "center",
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
                                src={
                                    localFormData.avatar ||
                                    defaultAvatar ||
                                    imageURL
                                }
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
                                {localFormData.name}
                            </h3>{" "}
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <form style={{ width: "90%" }} onSubmit={handleSave}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <label
                                    style={{
                                        paddingRight: 100,
                                        width: "15%",
                                    }}
                                >
                                    Name
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: "1px solid #d1d5db",
                                    }}
                                    type="text"
                                    id="name"
                                    value={localFormData.name}
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
                                <label
                                    style={{
                                        paddingRight: 100,
                                        width: "15%",
                                    }}
                                >
                                    Phone
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: "1px solid #d1d5db",
                                    }}
                                    type="text"
                                    id="phone"
                                    value={localFormData.phone}
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
                                <label
                                    style={{
                                        paddingRight: 100,
                                        width: "15%",
                                    }}
                                >
                                    Gender
                                </label>
                                <Select
                                    id="gender"
                                    name="gender"
                                    value={localFormData.gender}
                                    onChange={handleChange}
                                    options={options}
                                    style={{ width: "100%", padding: "12px" }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <label
                                    style={{
                                        paddingRight: 100,
                                        width: "15%",
                                    }}
                                >
                                    Date Of Birth
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: "1px solid #d1d5db",
                                    }}
                                    type="date"
                                    value={localFormData.dateOfBirth}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            dateOfBirth: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "8px 0",
                                }}
                            >
                                <label
                                    style={{
                                        paddingRight: 100,
                                        width: "15%",
                                    }}
                                >
                                    Class(s)
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: "1px solid #d1d5db",
                                    }}
                                    type="text"
                                    value={classes
                                        .map(
                                            (classItem) =>
                                                classItem.data.class.name
                                        )
                                        .join(",")}
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

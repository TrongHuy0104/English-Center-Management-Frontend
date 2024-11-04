import { useState, useEffect, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Heading from "../ui/Heading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultAvatar from "../../public/img/default-user.jpg";
import { useUserProfile } from "../features/student/profiles/useUserProfile";
import useUser from "../features/authentication/useUser";

const UserProfile = () => {
    const { user } = useUser();
    const { profileData, isLoading, error, updateProfile } = useUserProfile(
        user.user._id
    );
    // const [formData, setFormData] = useState(profileData || {});
    const [formData, setFormData] = useState({});
    const [imageURL, setImageURL] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    console.log(profileData);

    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.roleDetails.name || "",
                email: profileData.user.email || "",
                phone: profileData.roleDetails.phone || "",
                gender: profileData.roleDetails.gender || "",
                dateOfBirth: profileData.roleDetails.dateOfBirth || "",
                avatar: profileData.roleDetails.avatar || "",
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    function handleEditAvatar() {
        fileInputRef.current.click();
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const newImageURL = URL.createObjectURL(file);
            setImageURL(newImageURL);
            setSelectedImage(file);

            setFormData((prevData) => ({
                ...prevData,
                avatar: newImageURL,
            }));
        }
    }

    async function handleSave(e) {
        e.preventDefault();
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
            }

            // Update both user and role-specific data
            await updateProfile({
                ...formData,
                avatar: avatarUrl,
            });

            console.log("Saving data:", { ...formData, avatar: avatarUrl });
            toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile.");
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!profileData) return <div>No profile data found.</div>;

    const options = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Heading as="h1">User Profile</Heading>
                <Button
                    type="submit"
                    onClick={handleSave}
                    style={{ color: "white" }}
                >
                    Update Profile
                </Button>
            </div>
            <ToastContainer position="top-right" />
            <div
                style={{
                    backgroundColor: "var(--color-grey-0)",
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
                                backgroundColor: "var(--color-grey-0)",
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
                                src={formData.avatar || defaultAvatar}
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
                                    color: "var(--color-grey-900)",
                                    textAlign: "center",
                                    marginTop: "20px",
                                }}
                            >
                                {formData.name}
                            </h3>
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
                                    style={{ paddingRight: 100, width: "15%" }}
                                >
                                    Name
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        backgroundColor: "var(--color-grey-0)",
                                        border: " 1px solid var(--color-grey-300)",
                                    }}
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
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
                                    style={{ paddingRight: 100, width: "15%" }}
                                >
                                    Email
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: " 1px solid var(--color-grey-300)",
                                        backgroundColor: "var(--color-grey-0)",
                                    }}
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
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
                                    style={{ paddingRight: 100, width: "15%" }}
                                >
                                    Phone
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: " 1px solid var(--color-grey-300)",
                                        backgroundColor: "var(--color-grey-0)",
                                    }}
                                    type="text"
                                    name="phone"
                                    value={formData.phone || ""}
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
                                    style={{ paddingRight: 100, width: "15%" }}
                                >
                                    Gender
                                </label>
                                <Select
                                    name="gender"
                                    value={formData.gender || ""}
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
                                    style={{ paddingRight: 100, width: "15%" }}
                                >
                                    Date Of Birth
                                </label>
                                <input
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        border: " 1px solid var(--color-grey-300)",
                                        backgroundColor: "var(--color-grey-0)",
                                    }}
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                            ? new Date(formData.dateOfBirth)
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

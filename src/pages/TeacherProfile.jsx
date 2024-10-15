import useUser from "../features/authentication/useUser";
import useTeacher from "../features/Teacher/useTeacher";
import useUpdateTeacher from "../features/Teacher/useUpdateTeacher";
import { useState } from "react";
import styled from "styled-components";
import useTeacherSalary from "../features/Teacher/useTeachersalary";
import useTeacherCenter from "../features/Teacher/useTeachercenter"; // Import the useTeacherCenter hook

// Các thành phần styled-components
const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.h1`
    font-size: 2em;
    color: #333;
    text-align: center;
`;

const TeacherDetails = styled.div`
    margin-top: 30px;
`;

const TeacherInfo = styled.p`
    font-size: 1em;
    color: #333;
`;

const UpdateForm = styled.form`
    margin-top: 30px;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #218838;
    }
`;

function TeacherProfile() {
    const { isLoading: isLoadingUser, user } = useUser();
    const teacherId = user.roleDetails._id;
    const { isLoading: isLoadingTeacher, teacher } = useTeacher(teacherId);
    const { isLoading: isLoadingSalary, salary } = useTeacherSalary(teacherId); // Fetch salary data
    const { isLoading: isLoadingCenter, center } = useTeacherCenter(teacherId); // Fetch center data
    const { updateTeacher, isUpdating } = useUpdateTeacher(teacherId);
    const [formData, setFormData] = useState({
        name: teacher?.name || "",
        phone: teacher?.phone || "",
        gender: teacher?.gender || "",
        dateOfBirth: teacher?.dateOfBirth || "",
        salary: teacher?.salary || "",
    });

    const [isFormVisible, setFormVisible] = useState(false); // Trạng thái điều khiển hiển thị form

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTeacher(formData);
    };

    const toggleFormVisibility = () => {
        setFormVisible((prevVisible) => !prevVisible);
    };

    if (isLoadingUser || isLoadingTeacher || isLoadingSalary || isLoadingCenter) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileContainer>
            <ProfileHeader>Teacher Profile</ProfileHeader>
            {teacher ? (
                <>
                    <TeacherDetails>
                        <TeacherInfo>Name: {teacher.name}</TeacherInfo>
                        <TeacherInfo>Phone: {teacher.phone}</TeacherInfo>
                        <TeacherInfo>Gender: {teacher.gender}</TeacherInfo>
                        <TeacherInfo>Date of Birth: {teacher.dateOfBirth}</TeacherInfo>
                        <TeacherInfo>Salary: {salary.salary[0].calculatedSalary}</TeacherInfo> 
                        <TeacherInfo>Center: {center.center.name}</TeacherInfo>
                        <TeacherInfo>Location: {center.center.location}</TeacherInfo>  
                    </TeacherDetails>

                    {/* Nút để hiện form cập nhật */}
                    <ToggleButton onClick={toggleFormVisibility}>
                        {isFormVisible ? "Cancel Update" : "Update Profile"}
                    </ToggleButton>

                    {/* Chỉ hiển thị form nếu isFormVisible là true */}
                    {isFormVisible && (
                        <UpdateForm onSubmit={handleSubmit}>
                            <FormLabel>
                                Name:
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </FormLabel>
                            <FormLabel>
                                Phone:
                                <FormInput
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </FormLabel>
                            <FormLabel>
                                Gender:
                                <FormInput
                                    as="select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </FormInput>
                            </FormLabel>
                            <FormLabel>
                                Date of Birth:
                                <FormInput
                                    type="text"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </FormLabel>
                            <SubmitButton type="submit" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Profile"}
                            </SubmitButton>
                        </UpdateForm>
                    )}
                </>
            ) : (
                <TeacherInfo>No teacher data available.</TeacherInfo>
            )}
        </ProfileContainer>
    );
}

export default TeacherProfile;

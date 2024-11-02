// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getAttendanceData, takeAttendance } from "../../../services/apiTeacher";

// function useStudentList(teacherId, todayDate, slot) {
//     const [attendanceData, setAttendanceData] = useState(null);

//     // Chuyển phần fetch data sang useQuery
//     const { isLoading, error } = useQuery({
//         queryKey: ['attendance', teacherId, todayDate, slot],
//         queryFn: async () => {
//             const response = await getAttendanceData(teacherId, todayDate, slot);
//             setAttendanceData(response.data.data.attendance);
//             return response;
//         },
//         enabled: !!(teacherId && todayDate && slot),
//         onError: (err) => {
//             toast.error("Failed to load attendance data.");
//         }
//     });

//     // Thêm useMutation cho phần submit attendance
//     const { mutateAsync: submitAttendance } = useMutation({
//         mutationFn: async () => {
//             const attendanceList = attendanceData.student_attendance.map((student) => ({
//                 studentId: student.student_id,
//                 status: student.status,
//             }));
//             return await takeAttendance(teacherId, todayDate, slot, attendanceList);
//         },
//         onSuccess: () => {
//             toast.success("Attendance has been submitted successfully!");
//         },
//         onError: (error) => {
//             console.error("Error submitting attendance:", error);
//             toast.error("Failed to submit attendance. Please try again.");
//         }
//     });

//     const handleSubmitAttendance = async () => {
//         try {
//             await submitAttendance();
//         } catch (error) {
//             // Error đã được xử lý trong onError của mutation
//         }
//     };

//     return { 
//         attendanceData, 
//         loading: isLoading, 
//         error, 
//         handleSubmitAttendance, 
//         setAttendanceData 
//     };
// }

// export default useStudentList;
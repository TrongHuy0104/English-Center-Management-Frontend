import React from 'react';
import { useLocation } from 'react-router-dom';

function StudentList() {
    const location = useLocation();
    const { students } = location.state || { students: [] }; 

    return (
        <div>
            <h2>Student Attendance</h2>
            {students.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No student attendance data available.</p>
            )}
        </div>
    );
}

export default StudentList;

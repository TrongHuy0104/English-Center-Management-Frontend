import React from 'react';
import { useLocation } from 'react-router-dom';
import "../../../styles/StudentList.css";

function StudentList() {
    const location = useLocation();
    const { students } = location.state || { students: [] };

    return (
        <div className="student-list">
            {/* <h2>Take Attendance</h2> */}
            {students.length > 0 ? (
                <div className="attendance-table">
                    <div className="header-container">
                        <div>No.</div>
                        <div>Student Name</div> 
                        <div>Student ID</div>
                        <div>Status</div>
                    </div>
                    {students.map((student, index) => (
                        <div className="row-container" key={student.student_id}>
                            <div>{index + 1}</div> 
                            <div>{student.name}</div> 
                            <div>{student.student_id}</div>
                            <div className={student.status === 'present' ? 'present' : 'absent'}>
                                {student.status}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No student attendance data available.</p>
            )}
        </div>
    );
}

export default StudentList;

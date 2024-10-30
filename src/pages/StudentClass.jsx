import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ClassTag from '../features/student/myclass/ClassTag';
import styled from 'styled-components';
import useClass from '../features/student/myclass/useClass';
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 60px;
`;

const SectionWrapper = styled.div`
  margin-bottom: 40px;
`;

const StudentClass = () => {
    const { isLoading, classes, error } = useClass(); 
    const navigate = useNavigate(); 

    const handleClassClick = (classId) => {
        navigate(`/student/classes/${classId}`); 
    };

    const notEnrolledClasses = classes?.filter(classItem =>
        classItem.isEnrolled === false
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (!classes.length) {
        return <Empty resource="classes"/>;
    }

    return (
        <Row type="vertical">
            <SectionWrapper>
                <Heading as="h1">Classes not enrolled yet</Heading>
                <ClassContainer>
                    {notEnrolledClasses?.map((classItem) => (
                        <ClassTag
                            key={classItem._id}
                            name={classItem.name}
                            deadline={classItem.enrollment_deadline}
                            imageUrl=""
                            onClick={() => handleClassClick(classItem._id)}
                            id={classItem._id}
                        />
                    ))}
                </ClassContainer>
            </SectionWrapper>
        </Row>
    );
};

export default StudentClass;

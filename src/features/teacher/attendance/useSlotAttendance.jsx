import { useEffect, useState } from "react";
import { getClassesByTeacherId } from "../../../services/apiTeacher"; 

function useSlotAttendance(teacherId) {
    const [classData, setClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setIsLoading(true);
                const res = await getClassesByTeacherId(teacherId);
                setClassData(res.data?.data || []);
                
            } catch (err) {
                console.error("Error fetching class data:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (teacherId) {
            fetchClassData();
        } else {
            setIsLoading(false);
        }
    }, [teacherId]);
    
    return { isLoading, classData, error };
}

export default useSlotAttendance;

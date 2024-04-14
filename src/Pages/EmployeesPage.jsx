import { useEffect } from "react";

const EmployeesPage = () => {
    useEffect(() => {
        document.title = 'Employees - Todo app';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Employees</h2>
            
        </div>
    )
}

export default EmployeesPage;
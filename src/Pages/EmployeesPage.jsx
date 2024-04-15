import { useContext, useEffect, useState } from "react";
import EmployeeTable from "../Tables/EmployeeTable";
import EmployeeDataService from "../Services/EmployeeDataService";
import EmployeeEditModal from "../Modals/EmployeeEditModal";

const EmployeesPage = () => {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);

    const handleOpenForm = (id, event) => {
        setEmployeeId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const specialitiesData = await EmployeeDataService.getAll();
        setEmployees(specialitiesData.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
        document.title = 'Employees - Todo app';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Employees</h2>
            <div>
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button> 
            </div>
            <EmployeeTable 
                employees={ employees } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <EmployeeEditModal 
                employeeId={ employeeId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
        </div>
    )
}

export default EmployeesPage;
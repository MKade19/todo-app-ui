import { useContext, useEffect, useState } from "react";
import EmployeeTable from "../Tables/EmployeeTable";
import EmployeeDataService from "../Services/EmployeeDataService";
import EmployeeEditModal from "../Modals/EmployeeEditModal";
import EmployeeObjectivesModal from "../Modals/EmployeeObjectivesModal";

const EmployeesPage = () => {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [objectiveModalOpened, setObjectiveModalOpened] = useState(false);

    const handleOpenForm = (id, event) => {
        setEmployeeId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const handleOpenObjectiveModal = (id, event) => {
        setEmployeeId(id);
        setObjectiveModalOpened(true);
    }

    const handleCloseObjectiveModal= event => {
        setObjectiveModalOpened(false);
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
                handleOpenObjectiveModal={ handleOpenObjectiveModal }
                fetchData={ fetchData }
            />
            <EmployeeEditModal 
                employeeId={ employeeId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
            <EmployeeObjectivesModal
                employeeId={ employeeId }
                showModal={ objectiveModalOpened }
                handleClose={ handleCloseObjectiveModal }
            />
        </div>
    )
}

export default EmployeesPage;
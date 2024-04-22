import { useContext, useEffect, useState } from "react";
import EmployeeTable from "../Tables/EmployeeTable";
import EmployeeDataService from "../Services/EmployeeDataService";
import EmployeeEditModal from "../Modals/EmployeeEditModal";
import EmployeeObjectivesModal from "../Modals/EmployeeObjectivesModal";
import AuthContext from "../AuthContext";
import SearchEmployeesModal from "../Modals/SearchEmployeesModal";

const EmployeesPage = () => {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [objectiveModalOpened, setObjectiveModalOpened] = useState(false);
    const [searchFormOpened, setSearchFormOpened] = useState(false);

    const { user } = useContext(AuthContext);

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
        const specialitiesResponse = await EmployeeDataService.getAll();
        setEmployees(specialitiesResponse.data);
    }

    const fetchSearchData = async searchData => {
        const employeesResponse = await EmployeeDataService.searchMany(searchData);
        setEmployees(employeesResponse.data);
    }

    const handleOpenSearchForm = event => {
        setSearchFormOpened(true);
    }

    const handleCloseSearchForm = event => {
        setSearchFormOpened(false); 
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
                <button className="btn btn-outline-primary mx-4" onClick={ handleOpenSearchForm }><i className="bi bi-search"></i> Search</button>
                <button className="btn btn-outline-secondary" onClick={ fetchData }><i className="bi bi-arrow-repeat"></i> Refresh search</button>
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
            <SearchEmployeesModal
                fetchSearchData={ fetchSearchData }
                handleClose={ handleCloseSearchForm }
                showModal={ searchFormOpened }
            />
        </div>
    )
}

export default EmployeesPage;
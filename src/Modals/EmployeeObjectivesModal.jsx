import { Modal } from "react-bootstrap";
import ObjectiveDataService from "../Services/ObjectiveDataService";
import { useEffect, useState } from "react";
import EmployeeDataService from "../Services/EmployeeDataService";
import ObjectiveEditModal from "../Modals/ObjectiveEditModal";
import ObjectivesTable from "../Tables/ObjectivesTable";

const EmployeeObjectivesModal = ({ employeeId, showModal, handleClose }) => {
    const [employee, setEmployee] = useState({});
    const [objectives, setObjectives] = useState([]);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [objectiveId, setObjectiveId] = useState(null);

    const fetchData = async () => {
        if (employeeId) {
            const objectivesResponse = await ObjectiveDataService.getByEmployeeId(employeeId);
            setObjectives(objectivesResponse.data);

            const employeeResponse = await EmployeeDataService.getById(employeeId);
            setEmployee(employeeResponse.data);
        }
    }

    const handleOpenForm = (id, event) => {
        setObjectiveId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, [employeeId]);

    return (
        <div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header>
                    <div className="d-flex justify-content-center">
                        <Modal.Title>{employee.username}'s objectives</Modal.Title>
                        <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary mx-5">
                            <div className="bi bi-plus-circle"> Create new</div>
                        </button> 
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <ObjectivesTable
                        fetchData={ fetchData }
                        objectives={ objectives }
                        handleOpenForm={ handleOpenForm }
                    />
                    <ObjectiveEditModal
                        employeeId={employeeId}
                        fetchData={ fetchData }
                        handleClose={ handleCloseForm }
                        objectiveId={ objectiveId }
                        showModal={ editFormOpened }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={ handleClose }>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeObjectivesModal;
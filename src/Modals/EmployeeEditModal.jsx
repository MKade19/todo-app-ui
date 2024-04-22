import { Modal } from "react-bootstrap";
import EmployeeEditForm from "../Forms/EmployeeEditForm";

const EmployeeEditModal = ({ employeeId, showModal, handleClose, fetchData }) => {
    return (
        <div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>{ employeeId ? 'Edit' : 'Create' } employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeEditForm employeeId= {employeeId } handleClose={ handleClose } fetchData={ fetchData }/>
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

export default EmployeeEditModal;
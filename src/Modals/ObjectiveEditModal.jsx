import { Modal } from "react-bootstrap";
import ObjectiveEditForm from "../Forms/ObjectiveEditForm";

const ObjectiveEditModal = ({ employeeId, objectiveId, showModal, handleClose, fetchData }) => {
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
                    <Modal.Title>{ objectiveId ? 'Edit' : 'Create' } objective</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ObjectiveEditForm 
                        employeeId={employeeId}
                        objectiveId= { objectiveId } 
                        handleClose={ handleClose } 
                        fetchData={ fetchData }
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

export default ObjectiveEditModal;
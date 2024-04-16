import { Modal } from "react-bootstrap";
import SpecialityEditForm from "../Forms/SpecialityEditForm";

const SpecialityEditModal = ({ specialityId, showModal, handleClose, fetchData }) => {
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
                    <Modal.Title>{specialityId ? 'Edit' : 'Create'} speciality</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SpecialityEditForm specialityId={specialityId} handleClose={handleClose} fetchData={ fetchData }/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SpecialityEditModal;
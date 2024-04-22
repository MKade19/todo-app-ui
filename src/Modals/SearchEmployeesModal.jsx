import { Modal } from "react-bootstrap";
import SearchEmployeesForm from "../Forms/SearchEmployeesForm";

const SearchEmployeesModal = ({ showModal, handleClose, fetchSearchData }) => {
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
                    <Modal.Title>Search employees</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchEmployeesForm handleClose={ handleClose } fetchSearchData={ fetchSearchData }/>
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

export default SearchEmployeesModal;
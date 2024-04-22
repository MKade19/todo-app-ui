import { Modal } from "react-bootstrap";
import SearchObjectivesForm from "../Forms/SearchObjectivesForm";

const SearchObjectivesModal = ({ showModal, handleClose, fetchSearchData }) => {
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
                    <Modal.Title>Search objectives</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchObjectivesForm handleClose={ handleClose } fetchSearchData={ fetchSearchData }/>
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

export default SearchObjectivesModal;
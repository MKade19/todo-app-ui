import Table from 'react-bootstrap/Table';
import ObjectiveDataService from '../Services/ObjectiveDataService';
import Swal from "sweetalert2";

const ObjectivesTable = ({ handleOpenForm, objectives, fetchData }) => {
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: "Please confirm",
            text: 'Are you sure, to delete the objective?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            confirmButtonColor: '#007bff',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Objective has been deleted",
                    icon: "success",
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await ObjectiveDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return objectives.map(a => createRow(a));
    }
 
    const createRow = objective => {
        return (
            <tr key={objective.id}>
                <td>{objective.title}</td>
                <td>{objective.desciption}</td>
                <td><input className='form-check-input' readOnly type="checkbox" checked={objective.isCompleted}/></td>
                <td>{new Date(objective.createdDate).toLocaleDateString()}</td>
                <td>{new Date(objective.updatedDate).toLocaleDateString()}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(objective.id, event) } }>
                        <i className="bi bi-pen"></i>
                    </button>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(objective.id, event) } }>
                        <i className="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Desciption</th>
                        <th>Is objective<br/>completed?</th>
                        <th>Created date</th>
                        <th>Updated date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default ObjectivesTable;
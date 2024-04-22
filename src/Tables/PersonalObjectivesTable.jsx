import Table from 'react-bootstrap/Table';
import ObjectiveDataService from '../Services/ObjectiveDataService';
import Swal from "sweetalert2";

const PersonalObjectivesTable = ({ objectives, fetchData }) => {
    const completeHandler = async (id, event) => {
        Swal.fire({
            title: "Please confirm",
            text: 'Are you sure, that you have this objective completed?',
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
                let completedObjective = objectives.filter(o => o.id === id)[0];
                completedObjective.isCompleted = true;

                await ObjectiveDataService.updateOne(completedObjective);
                await fetchData();

                Swal.fire({
                    title: "Objective completion has been confirmed",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
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
                    <button disabled={objective.isCompleted} className='btn btn-outline-primary' onClick={ event => { completeHandler(objective.id, event) } }>
                        <i className="bi bi-check2"></i> Complete
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
                        <th>Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default PersonalObjectivesTable;
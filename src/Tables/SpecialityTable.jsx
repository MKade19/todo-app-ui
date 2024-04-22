import Table from 'react-bootstrap/Table';
import SpecialityDataService from "../Services/SpecialityDataService";
import Swal from "sweetalert2";

const SpecialityTable = ({ handleOpenForm, specialities, fetchData }) => {
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: "Please confirm",
            text: 'Are you sure, to delete the speciality? Any employee the speciality involves will be deleted as well',
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
                    title: "Speciality has been deleted",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await SpecialityDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return specialities.map(d => createRow(d));
    }
 
    const createRow = speciality => {
        return (
            <tr key={speciality.id}>
                <td>{speciality.title}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(speciality.id, event) } }>
                        <i className="bi bi-pen"></i>
                    </button>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(speciality.id, event) } }>
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

export default SpecialityTable;
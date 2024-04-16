import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeDataService from "../Services/EmployeeDataService";
import ObjectiveDataService from "../Services/ObjectiveDataService";

const ObjectiveEditForm = ({ objectiveId, employeeId, handleClose, fetchData }) => {
    const [title, setTitle] = useState('');
    const [desciption, setDesciption] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (objectiveId) {
                const employeeResponse = await ObjectiveDataService.getById(objectiveId);
                setTitle(employeeResponse.data.title);
                setDesciption(employeeResponse.data.desciption);
                setIsCompleted(employeeResponse.data.isCompleted);
            }
        } 

        fetchData().catch(console.error);
    }, [objectiveId]);

    const changeTitle = event => {
        setTitle(event.target.value);
    }

    const changeDesciption = event => {
        setDesciption(event.target.value);
    }

    const changeIsCompleted = event => {
        setIsCompleted(!isCompleted);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (objectiveId) {
                response = await ObjectiveDataService.updateOne({ 
                    id: objectiveId, 
                    title: title, 
                    desciption: desciption, 
                    isCompleted: isCompleted,
                });
                Swal.fire({
                    title: "Objective has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await ObjectiveDataService.createOne({ 
                    title: title, 
                    desciption: desciption,
                    employeeId: employeeId
                });
                Swal.fire({
                    title: "Objective has been created",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }

            fetchData();
            handleClose();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: `Validation error!`,
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    return (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="titleInput">Title</label>
                        <input className="form-control" placeholder="Enter title" required type="text" id="titleInput" value={title} onChange={changeTitle}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="desciptionInput">Desciption</label>
                        <input type="text" placeholder="Enter desciption" className="form-control" required id="desciptionInput" value={desciption} onChange={changeDesciption}/>
                    </div>
                    { 
                        !objectiveId ? null : 
                        <div className="flex-row align-items-center my-3">
                            <label className="mx-3" htmlFor="isCompletedInput">Is objective completed?</label>
                            <input className="form-check-input" type="checkbox" id="isCompletedInput" checked={isCompleted} onChange={changeIsCompleted}/>
                        </div>
                    }
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ObjectiveEditForm;
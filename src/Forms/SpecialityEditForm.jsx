import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SpecialityDataService from "../Services/SpecialityDataService";

const SpecialityEditForm =  ({ specialityId, handleClose, fetchData }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await SpecialityDataService.getById(specialityId);
            setTitle(response.data.title);
        } 

        if (specialityId) {
            fetchData().catch(console.error);
        }
    }, []);

    const changeName = event => {
        setTitle(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (specialityId) {
                response = await SpecialityDataService.updateOne({ id: specialityId, title: title });
                Swal.fire({
                    title: "Airline type has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await SpecialityDataService.createOne({ title: title });
                Swal.fire({
                    title: "Airline type has been created",
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
                    <div className="flex-row my-3">
                        <label className="mx-3" htmlFor="titleInput">Title</label>
                        <input className="form-control" required type="text" id="titleInput" value={title} onChange={changeName} placeholder="Enter title"/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" required className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SpecialityEditForm;
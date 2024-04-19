import { useContext, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../AuthContext";

const SearchObjectivesForm = ({ employeeId, handleClose, fetchSearchData }) => {
    const [title, setTitle] = useState('');
    const [completion, setCompletion] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    const { user } = useContext(AuthContext);

    const changeTitle = event => {
        setTitle(event.target.value);
    }

    const changeCompletion = event => {
        setCompletion(event.target.value);
    }

    const changeMinDate = event => {
        setMinDate(event.target.value);
    }

    const changeMaxDate = event => {
        setMaxDate(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await fetchSearchData({ title, completion, minDate, maxDate });

            Swal.fire({
                title: "Search completed",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

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
                        <input className="form-control" placeholder="Enter title" type="text" id="titleInput" value={title} onChange={changeTitle}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="completionSelect">Completion</label>
                        <select className="form-select" 
                            id="completionSelect"
                            value={ completion } 
                            onChange={changeCompletion} 
                            placeholder="Choose option">
                            <option value={''}>Show all</option>
                            <option value={true}>Show completed</option>
                            <option value={false}>Show uncompleted</option>
                        </select>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="minDateInput">Min date</label>
                        <input className="form-control" type="date" id="minDateInput" value={minDate} onChange={changeMinDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="maxDateInput">Max date</label>
                        <input className="form-control" type="date" id="maxDateInput" value={maxDate} onChange={changeMaxDate}/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchObjectivesForm;
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RoleDataService from "../Services/RoleDataService";
import SpecialityDataService from "../Services/SpecialityDataService";

const SearchEmployeesForm = ({ handleClose, fetchSearchData }) => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [roles, setRoles] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [activeRole, setActiveRole] = useState({});
    const [activeSpeciality, setSpeciality] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const roleResponse = await RoleDataService.getAll();
            setRoles(roleResponse.data);

            const specialityResponse = await SpecialityDataService.getAll();
            setSpecialities(specialityResponse.data);
        } 

        fetchData().catch(console.error);
    }, []);

    const changeUsername = event => {
        setUsername(event.target.value);
    }

    const changeFullname = event => {
        setFullname(event.target.value);
    }

    const changeMinDate = event => {
        setMinDate(event.target.value);
    }

    const changeMaxDate = event => {
        setMaxDate(event.target.value);
    }

    const changeMinAge = event => {
        setMinAge(event.target.value);
    }

    const changeMaxAge = event => {
        setMaxAge(event.target.value);
    }

    const changeActiveRole = event => {
        setActiveRole(roles.filter(e => e.name === event.target.value)[0]);
    }

    const changeActiveSpeciality = event => {
        setSpeciality(specialities.filter(c => c.title === event.target.value)[0]);
    }

    const addRolesOptions = () => {
        return roles.map(e => <option key={e.id}>{e.name}</option>);
    }

    const addSpeialitiesOptions = () => {
        return specialities.map(c => <option key={c.id}>{c.title}</option>);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await fetchSearchData({ 
                username: username, 
                fullname: fullname, 
                minDate, 
                maxDate,
                minAge,
                maxAge,
                roleId: activeRole.id,
                specialityId: activeSpeciality.id
            });

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
                        <label className="mx-3" htmlFor="usernameInput">Username</label>
                        <input className="form-control" placeholder="Enter username" type="text" id="usernameInput" value={username} onChange={changeUsername}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="fullnameInput">Fullname</label>
                        <input className="form-control" placeholder="Enter fullname" type="text" id="fullnameInput" value={fullname} onChange={changeFullname}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="minDateInput">Min date</label>
                        <input className="form-control" type="date" id="minDateInput" value={minDate} onChange={changeMinDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="maxDateInput">Max date</label>
                        <input className="form-control" type="date" id="maxDateInput" value={maxDate} onChange={changeMaxDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="minAgeInput">Min age</label>
                        <input className="form-control" placeholder="Enter min age" type="number" id="minAgeInput" value={minAge} onChange={changeMinAge}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="maxAgeInput">Max age</label>
                        <input className="form-control" placeholder="Enter max age" type="number" id="maxAgeInput" value={maxAge} onChange={changeMaxAge}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="roleSelect">Role</label>
                        <select className="form-select" 
                            id="roleSelect"
                            value={ activeRole.name } 
                            onChange={changeActiveRole} 
                            placeholder="Choose role">
                            <option key={0} value={''}>Any role</option>
                            {addRolesOptions()}
                        </select>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="specialitySelect">Speciality</label>
                        <select className="form-select" 
                            id="specialitySelect"
                            value={ activeSpeciality.title } 
                            onChange={changeActiveSpeciality} 
                            placeholder="Choose speciality">
                            <option key={0} value={''}>Any speciality</option>
                            {addSpeialitiesOptions()}
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchEmployeesForm;
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import RoleDataService from "../Services/RoleDataService";
import SpecialityDataService from "../Services/SpecialityDataService";
import EmployeeDataService from "../Services/EmployeeDataService";

const EmployeeEditForm = ({ employeeId, handleClose, fetchData }) => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [employmentDate, setEmploymentDate] = useState('');
    const [age, setAge] = useState(18);
    const [activeRole, setActiveRole] = useState({});
    const [activeSpeciality, setSpeciality] = useState({});
    const [roles, setRoles] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const roleResponse = await RoleDataService.getAll();
            setRoles(roleResponse.data);
            setActiveRole(roleResponse.data[0]);

            const specialityResponse = await SpecialityDataService.getAll();
            setSpecialities(specialityResponse.data);
            setSpeciality(specialityResponse.data[0]);

            if (employeeId) {
                const employeeResponse = await EmployeeDataService.getById(employeeId);
                setFullname(employeeResponse.data.fullname);
                setUsername(employeeResponse.data.username);
                setEmploymentDate(employeeResponse.data.employmentDate.split('T')[0]);
                setAge(employeeResponse.data.age);
                setActiveRole(employeeResponse.data.role);
                setSpeciality(employeeResponse.data.speciality);
            }
        } 

        fetchData().catch(console.error);
    }, [employeeId]);

    const changeFullname = event => {
        setFullname(event.target.value);
    }

    const changeUsername = event => {
        setUsername(event.target.value);
    }

    const changeEmploymentDate = event => {
        setEmploymentDate(event.target.value);
    }

    const changeAge = event => {
        setAge(event.target.value);
    }

    const changeActiveRole = event => {
        setActiveRole(roles.filter(e => e.name === event.target.value)[0]);
    }

    const changeActiveSpeciality = event => {
        setSpeciality(specialities.filter(c => c.title === event.target.value)[0]);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const addRolesOptions = () => {
        return roles.map(e => <option key={e.id}>{e.name}</option>);
    }

    const addSpeialitiesOptions = () => {
        return specialities.map(c => <option key={c.id}>{c.title}</option>);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (employeeId) {
                response = await EmployeeDataService.updateOne({ 
                    id: employeeId, 
                    fullname: fullname, 
                    username: username, 
                    employmentDate: employmentDate,
                    age: age,
                    role: activeRole, 
                    speciality: activeSpeciality,
                    password: password
                });
                Swal.fire({
                    title: "Employee has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await EmployeeDataService.createOne({ 
                    fullname: fullname, 
                    username: username,
                    employmentDate: employmentDate,
                    age: age, 
                    role: activeRole, 
                    speciality: activeSpeciality,
                    password: password
                });
                Swal.fire({
                    title: "Employee has been created",
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
                        <label className="mx-3" htmlFor="fullnameInput">Fullname</label>
                        <input className="form-control" placeholder="Enter fullname" required type="text" id="fullnameInput" value={fullname} onChange={changeFullname}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="usernameInput">Username</label>
                        <input type="text" placeholder="Enter username" className="form-control" required id="usernameInput" value={username} onChange={changeUsername}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="employmentDateInput">Employment date</label>
                        <input className="form-control" required type="date" id="employmentDateInput" value={employmentDate} onChange={changeEmploymentDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="ageInput">Age</label>
                        <input className="form-control" required type="number" min={18} id="ageInput" value={age} onChange={changeAge}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="roleSelect">Role</label>
                        <select className="form-select" 
                            id="roleSelect"
                            value={ activeRole.name } 
                            onChange={changeActiveRole} 
                            placeholder="Choose role">
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
                            {addSpeialitiesOptions()}
                        </select>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" placeholder="Enter password" required type="password" id="passwordInput" value={password} onChange={changePassword}/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EmployeeEditForm;
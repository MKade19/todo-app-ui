import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('employees');
    }

    getById = async id => {
        return await axios.get(`employees/${id}`);
    }

    searchMany = async ({ 
        username, 
        fullname, 
        minDate, 
        maxDate, 
        maxAge, 
        minAge, 
        roleId, 
        specialityId
    }) => {
        return await axios.get(
            `employees/search?` +
            `${username ? `username=${username}&` : ''}` +
            `${fullname ? `fullname=${fullname}&` : ''}` +
            `${minDate ? `mindate=${minDate}&` : ''}` +
            `${maxDate ? `maxdate=${maxDate}&` : ''}` +
            `${minAge ? `minage=${minAge}&` : ''}` +
            `${maxAge ? `maxage=${maxAge}&` : ''}` +
            `${roleId ? `roleid=${roleId}&` : ''}` +
            `${specialityId ? `specialityid=${specialityId}` : ''}`
        );
    }

    createOne = async employee => {
        const body = {
            username: employee.username,
            fullname: employee.fullname,
            employmentDate: employee.employmentDate,
            age: employee.age,
            roleId: employee.role.id,
            specialityId: employee.speciality.id,
            password: employee.password
        }

        return await axios.post('employees', body);
    }

    updateOne = async employee => {
        const body = {
            id: employee.id,
            username: employee.username,
            fullname: employee.fullname,
            employmentDate: employee.employmentDate,
            age: employee.age,
            roleId: employee.role.id,
            specialityId: employee.speciality.id,
            password: employee.password
        }

        return await axios.put(`employees`, body);
    }

    deleteById = async id => {
        return await axios.delete(`employees/${id}`);
    }
}

const employeeDataService = new EmployeeDataService();
export default employeeDataService;
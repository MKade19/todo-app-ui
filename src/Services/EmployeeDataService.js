import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('employees');
    }

    getById = async id => {
        return await axios.get(`employees/${id}`);
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
            specialityId: employee.speciality.id
        }

        return await axios.put(`employees`, body);
    }

    deleteById = async id => {
        return await axios.delete(`employees/${id}`);
    }
}

const employeeDataService = new EmployeeDataService();
export default employeeDataService;
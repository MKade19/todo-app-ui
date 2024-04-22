import axios from "../axios/axios"

class EmployeeDataService {
    getAll = async () => {
        return await axios.get('roles');
    }

    getById = async id => {
        return await axios.get(`roles/${id}`);
    }
}

const employeeDataService = new EmployeeDataService();
export default employeeDataService;
import axios from "../axios/axios";

class ObjectiveDataService {
    getAll = async () => {
        return await axios.get('objectives');
    }

    getById = async id => {
        return await axios.get(`objectives/${id}`);
    }

    getByEmployeeId = async employeeId => {
        return await axios.get(`objectives/employee/${employeeId}`);
    }

    createOne = async objective => {
        const body = {
            title: objective.title,
            desciption: objective.desciption,
            employeeId: objective.employeeId
        }

        return await axios.post('objectives', body);
    }

    updateOne = async objective => {
        const body = {
            id: objective.id,
            title: objective.title,
            desciption: objective.desciption,
            isCompleted: objective.isCompleted,
        }

        return await axios.put(`objectives`, body);
    }

    deleteById = async id => {
        return await axios.delete(`objectives/${id}`);
    }
}

const objectiveDataService = new ObjectiveDataService();
export default objectiveDataService;
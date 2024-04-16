import axios from "../axios/axios"

class SpecialityDataService {
    getAll = async () => {
        return await axios.get('specialities');
    }

    getById = async id => {
        return await axios.get(`specialities/${id}`);
    }

    createOne = async speciality => {
        const body = {
            title: speciality.title,
        }

        return await axios.post('specialities', body);
    }

    updateOne = async speciality => {
        const body = {
            id: speciality.id,
            title: speciality.title
        }

        return await axios.put(`specialities`, body);
    }

    deleteById = async id => {
        return await axios.delete(`specialities/${id}`);
    }
}

const specialityDataService = new SpecialityDataService();
export default specialityDataService;
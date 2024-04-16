import { useContext, useEffect, useState } from "react";
import SpecialityTable from "../Tables/SpecialityTable";
import SpecialityDataService from "../Services/SpecialityDataService";
import SpecialityEditModal from "../Modals/SpecialityEditModal";

const SpecialitiesPage = () => {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [specialityId, setSpecialityId] = useState(null);
    const [specialities, setSpecialities] = useState([]);

    const handleOpenForm = (id, event) => {
        setSpecialityId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const specialitiesData = await SpecialityDataService.getAll();
        setSpecialities(specialitiesData.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
        document.title = 'Specialities - Todo app';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Specialities</h2>
            <div>
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button> 
            </div>
            <SpecialityTable 
                specialities={ specialities } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <SpecialityEditModal 
                specialityId={ specialityId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
        </div>
    )
}

export default SpecialitiesPage;
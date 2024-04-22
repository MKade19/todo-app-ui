import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import ObjectiveDataService from "../Services/ObjectiveDataService";
import PersonalObjectivesTable from "../Tables/PersonalObjectivesTable";
import SearchObjectivesModal from "../Modals/SearchObjectivesModal";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [objectives, setObjectives] = useState([]);
    const [searchFormOpened, setSearchFormOpened] = useState(false);

    const fetchData = async () => {
        if (user()) {
            const objectivesResponse = await ObjectiveDataService.getByEmployeeId(user().id);
            setObjectives(objectivesResponse.data);
        }
    }

    const fetchSearchData = async ({ title, completion, minDate, maxDate }) => {
        if (user()) {
            const objectivesResponse = await ObjectiveDataService.searchMany({ 
                title: title, 
                completion: completion,
                minDate: minDate,
                maxDate: maxDate,
                employeeId: user().id
            });

            setObjectives(objectivesResponse.data);
        }
    }

    const handleOpenSearchForm = event => {
        setSearchFormOpened(true);
    }

    const handleCloseSearchForm = event => {
        setSearchFormOpened(false); 
    }

    useEffect(() => {
        document.title = 'Home - Todo app';
        fetchData().catch(console.error);
    }, [user]);
    
    return (
        <div>
            <h2 className="mb-4">Your objectives</h2>
            <div>
                <button className="btn btn-outline-primary mx-4" onClick={ handleOpenSearchForm }><i className="bi bi-search"></i> Search</button>
                <button className="btn btn-outline-secondary" onClick={ fetchData }><i className="bi bi-arrow-repeat"></i> Refresh search</button>
            </div>
            <PersonalObjectivesTable
                objectives={ objectives }
                fetchData={ fetchData }
            />
            <SearchObjectivesModal
                fetchSearchData={ fetchSearchData }
                handleClose={ handleCloseSearchForm }
                showModal={ searchFormOpened }
            />
        </div>
    )
}

export default HomePage;
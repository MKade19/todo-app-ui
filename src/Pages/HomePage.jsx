import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import ObjectiveDataService from "../Services/ObjectiveDataService";
import PersonalObjectivesTable from "../Tables/PersonalObjectivesTable";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [objectives, setObjectives] = useState([]);

    const fetchData = async () => {
        if (user()) {
            const objectivesResponse = await ObjectiveDataService.getByEmployeeId(user().id);
            setObjectives(objectivesResponse.data);
        }
    }

    useEffect(() => {
        document.title = 'Home - Todo app';
        fetchData().catch(console.error);
    }, [user]);
    
    return (
        <div>
            <h2 className="mb-4">{ user().username }'s objectives</h2>
            <PersonalObjectivesTable
                objectives={ objectives }
                fetchData={ fetchData }
            />
        </div>
    )
}

export default HomePage;
import { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";

const HomePage = () => {
    const { user } = useContext(AuthContext);

    const fetchData = () => {
        
    }

    useEffect(() => {
        document.title = 'Home - Todo app';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">{ user().username }'s objectives</h2>
            
        </div>
    )
}

export default HomePage;
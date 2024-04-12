import { useEffect } from "react";

const HomePage = () => {
    useEffect(() => {
        document.title = 'Home - Todo app';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Home</h2>
            
        </div>
    )
}

export default HomePage;
import { useEffect, useContext, useState } from "react";
import { ListGroup } from "react-bootstrap";
import AuthContext from "../AuthContext";
import AvatarImage from "../UI/AvatarImage";
import EmployeeDataService from "../Services/EmployeeDataService";
import Swal from "sweetalert2";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [employmentDate, setEmploymentDate] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState({});
    const [speciality, setSpeciality] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageName, setSelectedImageName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const employeeResponse = await EmployeeDataService.getById(user().id);
            setFullname(employeeResponse.data.fullname);
            setUsername(employeeResponse.data.username);
            setEmploymentDate(employeeResponse.data.employmentDate.split('T')[0]);
            setAge(employeeResponse.data.age);
            setRole(employeeResponse.data.role);
            setSpeciality(employeeResponse.data.speciality);
        }

        fetchData();
        document.title = `Profile- ${ user().username } - Todo app`;
    }, []);

    const handleImageChange = event => {
        if (event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
            setSelectedImageName(event.target.files[0].name);
        }
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const response = await EmployeeDataService.uploadImage(formData);

        if (response.status === 201) {
            Swal.fire({
                title: "You have upload new avatar. Resign in to see changes.",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        else {
            Swal.fire({
                title: "Error while uploading the avtar. Check if the file to upload exists or is in correct format.",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        
        setSelectedImage('');
        setSelectedImageName('');
    }

    return (
        <div>
            <h1 className="mb-5">{ user().username }'s profile</h1>
            <div className="d-flex justify-content-around mx-4">
                <div>
                    <AvatarImage imageName={ user().imagename }
                        width={350}
                        height={350}
                    />
                    <div className="d-flex align-items-center justify-content-around mt-3">
                        <input type="file" 
                            id="imageInput" 
                            hidden 
                            onChange={ handleImageChange }
                        />
                        <label htmlFor="imageInput" className="btn btn-outline-primary mx-2">
                            <i className="bi bi-image"></i> Change avatar
                        </label> 
                        { 
                            selectedImageName === '' ? null : 
                            <button className="btn btn-outline-secondary mx-2" disabled >{ selectedImageName }</button>  
                        }
                        <button className="btn btn-outline-success mx-2" onClick={ uploadImage } hidden={ !selectedImage }>
                            <i className="bi bi-check2"></i> Apply
                        </button> 
                    </div>
                                      
                </div>
                <div>
                    <ListGroup className="d-flex align-items-start">
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Fullname: </strong> { fullname }</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Username: </strong> { username }</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Employment date: </strong> { employmentDate }</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Age: </strong> { age }</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Role: </strong> { role.name }</p>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0">
                            <p className="fs-5"><strong>Speciality: </strong> { speciality.title }</p>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;

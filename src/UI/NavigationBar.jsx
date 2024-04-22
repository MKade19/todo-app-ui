import { useContext } from 'react'
import { NavLink, Nav, Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../AuthContext'
import AvatarImage from './AvatarImage'

const NavigationBar = () => {
    const { logoutUser, user } = useContext(AuthContext);

    const handleLogout = event => {
        logoutUser();
    }

    return (
        <Navbar bg="light" expand="lg" data-bs-theme="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <NavLink>Your tasks</NavLink>
                        </LinkContainer>
                        {
                            !user().role.employeesPermission ? null :
                            <LinkContainer to={"/employees"}>
                                <NavLink>Emloyees</NavLink>
                            </LinkContainer>
                        } 
                        {
                            !user().role.specialitiesPermission ? null :
                            <LinkContainer to={"/specialities"}>
                                <NavLink>Specialities</NavLink>
                            </LinkContainer>
                        }
                    </Nav>
                    <Navbar>
                        <LinkContainer to={'/profile'}>
                            <NavLink className="mx-3 d-flex align-items-center">
                                <AvatarImage imageName={ user().imagename }
                                    width={30}
                                    height={30}/>
                                { !user() ? '' : user().username + ', role - ' + user().role.name }
                            </NavLink>
                        </LinkContainer>
                        { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }
                    </Navbar>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
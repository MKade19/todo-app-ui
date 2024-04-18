import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './Layout/Layout';
import SignInPage from './Pages/SignInPage';
import HomePage from './Pages/HomePage';
import AuthContext from './AuthContext';
import EmployeesPage from './Pages/EmployeesPage';
import SpecialitiesPage from './Pages/SpecialitiesPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import PermissionTypes from './Constants/PermissionTypes';

function App() {
    const { user } = useContext(AuthContext);

    const renderProtectedRoutes = () => {
        let routes = []

        if (!user()) {
            return null;
        }

        if (user().role[PermissionTypes.SPECIALITIES_PERMISSION]) {
            routes.push(<Route key={'specialities-route'} path='/specialities' element={ <SpecialitiesPage/>}/>);
        }

        if (user().role[PermissionTypes.EMPLOYEES_PERMISSION]) {
            routes.push(<Route key={'employees-route'} path='/employees' element={ <EmployeesPage/> } />);
        }

        return routes.length === 0 ? null : routes;
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ user() ? <Layout/> : <Navigate to={'/auth/sign-in'}/> }>
                    <Route index element={ <HomePage/> }/>
                    { renderProtectedRoutes() }
                    <Route path='*' element={ <Navigate to={'/'}/> }/>
                </Route>
                <Route path='/auth' element={ !user() ? null : <Navigate to={'/'}/> }>
                    <Route path="sign-in" element={ <SignInPage/> }/>
                    <Route path="change-password" element={ <ChangePasswordPage/> }/>
                    <Route index element={ <Navigate to={'/auth/sign-in'}/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

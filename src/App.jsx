import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './Layout/Layout';
import SignInPage from './Pages/SignInPage';
import HomePage from './Pages/HomePage';
import AuthContext from './AuthContext';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ user() ? <Layout/> : <Navigate to={'/auth/sign-in'}/> }>
                    <Route index element={ <HomePage/> }/>
                    <Route path='*' element={ <Navigate to={'/'}/> }/>
                </Route>
                <Route path='/auth' element={ !user() ? null : <Navigate to={'/'}/> }>
                    <Route path="sign-in" element={ <SignInPage/> }/>
                    <Route index element={ <Navigate to={'/auth/sign-in'}/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

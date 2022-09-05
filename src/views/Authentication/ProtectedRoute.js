import { Navigate } from 'react-router-dom';
import { GetCookie } from './Cookies';

const ProtectedRoute = ({children}) => {
    

    return(
        loggedIn === 'true' ? children : <Navigate to='/login'></Navigate>
    );
}

export default ProtectedRoute;
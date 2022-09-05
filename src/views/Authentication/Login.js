import './login.css';
import { useRef } from 'react';
import { AuthLogin } from '../../Hooks/firebaseFuncs';
import { SetCookie } from './Cookies';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    let email = useRef('');
    let password = useRef('');
    let [user, setUser] = useState(false);

    const doAuth = () => {
        AuthLogin('users', email.current.value, password.current.value).then(
            (response) => {
                if (response){
                    SetCookie('email', email.current.value, 30);
                    SetCookie('pswd', password.current.value, 30);
                    setUser(true);
                }
            }
        );
    }

    return (
        <>
            {
                user ? <Navigate to='/'></Navigate>
                    :
                    <div className="loginDivCont">
                        <input type="text" className="loginInputField" placeholder='Your Email' ref={email} /> <br />
                        <input type="password" className="loginInputField" placeholder='Your Password' ref={password} /> <br />
                        <button className="loginButton" onClick={doAuth}>
                            LOG IN
                        </button>
                    </div>
            }
        </>
    );
}

export default Login;
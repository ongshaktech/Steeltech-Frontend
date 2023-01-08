import './login.css';
import { useRef } from 'react';
import { AuthLogin } from '../../Hooks/firebaseFuncs';
import { SetCookie } from './Cookies';
import { useState } from 'react';

const Login = () => {
    let email = useRef('');
    let password = useRef('');
    let [msg, setMsg] = useState("");

    const doAuth = (e) => {
        e.preventDefault();

        if (email.current.value === "" || password.current.value === "") {
            setMsg("Can't login with empty credentials!");
            return;
        }

        AuthLogin('users', email.current.value, password.current.value).then(
            (response) => {
                if (response[0]) {
                    SetCookie('email', email.current.value, 30);
                    SetCookie('pswd', password.current.value, 30);
                    window.location.reload();
                }
                else setMsg("Wrong Credentials!");
            }
        );
    }

    return (
        <form>
            <h1 className='loginHeader'>
                Steeltech Admin <br /> Login
            </h1>
            <div className="loginDivCont">
                <input type="text" className="loginInputField" placeholder='Your Email' ref={email} required /> <br />
                <input type="password" className="loginInputField" placeholder='Your Password' ref={password} required /> <br />
                <button className="loginButton" onClick={doAuth}>
                    LOG IN
                </button>
                <p className='loginMsg'>
                    {msg}
                </p>
            </div>
        </form>
    );
}

export default Login;
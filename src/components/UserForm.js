import React from 'react';
import { ReportsFormContainer } from '../styles/CommonReports.styled';
import { useRef } from 'react';
import { userTypes } from '../shared/constants';

export default function UserForm({ setFormData, setshowUserModal }) {

    let username = useRef('');
    let name = useRef('');
    let password = useRef('');
    let email = useRef('');
    let access = useRef('');

    const setData = () => {

        setFormData({
            username: username.current.value,
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            access: access.current.value
        });

        setshowUserModal(false);
    }


    return (
        <ReportsFormContainer bg="#00B6CD">
            <h3>Add Users</h3>
            <form>
                <label>
                    <p>User Name*</p>
                    <input type="text" ref={username} />
                </label>
                <label>
                    <p>Name*</p>
                    <input type="text" ref={name} />
                </label>
                <label>
                    <p>Password*</p>
                    <input type="password" ref={password} />
                </label>
                <label>
                    <p>Email*</p>
                    <input type="email" ref={email} />
                </label>
                <label>
                    <p>Access*</p>
                    <select ref={access}>
                        {
                            userTypes.map(
                                (user) =>
                                    <option value={user}>{user}</option>
                            )
                        }
                    </select>
                </label>
                <input className='submit' type="button" value="submit" onClick={setData} />
            </form>
        </ReportsFormContainer>
    )
}

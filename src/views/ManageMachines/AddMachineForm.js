import { useState } from "react";
import { ReportsFormContainer } from "../../styles/CommonReports.styled";

export default function AddMachineForm({ setMachineData, text, setShowModal }) {

    let [msg, setMsg] = useState('')

    const setData = (e) => {
        e.preventDefault();

        if (e.target.machine_no.value !== "") {
            setMachineData({
                'machine_no': e.target.machine_no.value
            });
            setShowModal(false);
        }
        else {
            setMsg('Machine number cannot be empty!');
            return false;
        }
    }

    return (
        <ReportsFormContainer bg="#E65192">
            <form onSubmit={setData}>
                <h3>Add {text}</h3>

                <br /><br /><br />
                <label>
                    <p>Machine No*</p>
                    <input type="number" name="machine_no" />
                </label>
                <br /><br />

                <button className='submit' type="submit">
                    Add
                </button>

                <span className='msgSpan'>
                    {msg}
                </span>
            </form>
        </ReportsFormContainer>
    );
}
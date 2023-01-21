import React, { useState } from 'react';
import { ReportsFormContainer } from '../styles/CommonReports.styled';
import { useRef } from 'react';
import { ProductTypes, Shifts } from '../shared/constants';
import { ProductThickness } from '../shared/constants';
import { useEffect } from 'react';
import { db_firestore } from '../Hooks/config';
import { doc, getDoc } from 'firebase/firestore';


export default function ProductForm({ setFormData, setshowProductModal }) {
    let [machineNumList, setMachineNumList] = useState([]);
    let [msg, setMsg] = useState('');
    let machine_no = useRef('');
    let thickness = useRef('');
    let product_type = useRef('');
    let shift = useRef('');

    

    const setData = (e) => {
        e.preventDefault();

        if (machine_no.current.value === "" || thickness.current.value === "" || product_type.current.value === "" || shift.current.value === "") {
            setMsg('Please fill up this form properly');
            return false;
        }

        setFormData({
            machine_no: machine_no.current.value,
            thickness: thickness.current.value,
            product_type: product_type.current.value,
            shift: shift.current.value
        });

        setshowProductModal(false);
    }


    useEffect(() => {
        const ref = doc(db_firestore, `information`, 'info');

        getDoc(ref).then(data => {
            let numList = [];
            const list = data.data();

            numList.push(<optgroup label='Forming Machines'></optgroup>)
            list['forming_machine'].forEach((num, index)=>{
                numList.push(<option key={index} value={num}>{num}</option>)
            });

            numList.push(<optgroup label='Polish Machines'></optgroup>)
            list['polish_machine'].forEach((num, index)=>{
                numList.push(<option key={index + numList.length} value={num}>{num}</option>)
            });
            
            setMachineNumList(numList);
        });
    }, []);
    

    return (
        <ReportsFormContainer bg="#E65192">
            <form onSubmit={setData}>
                <h3>Add Product</h3>

                <label>
                    <p>Machine No*</p>

                    <select ref={machine_no}>
                        <option selected disabled value=''>Machine No.</option>
                        {machineNumList}
                    </select>

                </label>

                <label>
                    <p>Thickness*</p>
                    <select ref={thickness}>
                        <option selected disabled value=''>Product Thickness</option>
                        {
                            ProductThickness.map(
                                (type) =>
                                    <option value={type}>{type}</option>
                            )
                        }
                    </select>
                </label>

                <label>
                    <p>Product Type*</p>
                    <select ref={product_type}>
                        <option selected disabled value=''>Product Type</option>
                        {
                            ProductTypes.map(
                                (type) =>
                                    <option value={type}>{type}</option>
                            )
                        }
                    </select>
                </label>

                <label>
                    <p>Shift*</p>
                    <select ref={shift}>
                        <option selected disabled value=''>Select Shift</option>
                        {
                            Shifts.map(
                                (shift) =>
                                    <option value={shift}>{shift}</option>
                            )
                        }
                    </select>
                </label>

                <button className='submit' type="submit">
                    Submit
                </button>

                <span className='msgSpan'>
                    {msg}
                </span>
            </form>
        </ReportsFormContainer>
    )
}

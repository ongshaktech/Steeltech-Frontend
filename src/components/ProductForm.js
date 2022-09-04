import React from 'react';
import { ReportsFormContainer } from '../styles/CommonReports.styled';
import { useRef } from 'react';

export default function ProductForm({ setFormData, setshowProductModal }) {
    let machine_no = useRef('');
    let thickness = useRef('');
    let product_type = useRef('');
    let shift = useRef('');

    const setData = () => {

        setFormData({
            machine_no: machine_no.current.value,
            thickness: thickness.current.value,
            product_type: product_type.current.value,
            shift: shift.current.value
        });

        setshowProductModal(false);
    }

    return (
        <ReportsFormContainer bg="#E65192">
            <form>
                <h3>Add Product</h3>
                <label>
                    <p>Machine No*</p>
                    <input type="text" ref={machine_no} />
                </label>
                <label>
                    <p>Thickness*</p>
                    <input type="text" ref={thickness} />
                </label>
                <label>
                    <p>Product Type*</p>
                    <select ref={product_type}>
                        <option value="Circular">Circular</option>
                        <option value="Rectangular">Rectangular</option>
                    </select>
                </label>
                <label>
                    <p>Shift*</p>
                    <select ref={shift}>
                        <option value="morning">Morning</option>
                        <option value="evening">evening</option>
                    </select>
                </label>
                <input className='submit' type="button" value="Submit" onClick={setData} />
            </form>
        </ReportsFormContainer>
    )
}

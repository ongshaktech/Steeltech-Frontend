import React from 'react'
import { ReportsFormContainer } from '../styles/CommonReports.styled'

export default function ProductForm() {
    return (
        <ReportsFormContainer bg="#E65192">
            <h3>Add Product</h3>
            <form>
                <label>
                    <p>Machine No*</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Thickness*</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Product Type*</p>
                    <select>
                        <option>Circular 1</option>
                        <option>Circular 1</option>
                        <option>Circular 1</option>
                        <option>Circular 1</option>
                    </select>
                </label>
                <label>
                    <p>Shift*</p>
                    <select>
                        <option>Morning</option>
                        <option>afternoon</option>
                        <option>evening</option>
                    </select>
                </label>
                <input className='submit' type="submit" value="submit" />
            </form>
        </ReportsFormContainer>
    )
}

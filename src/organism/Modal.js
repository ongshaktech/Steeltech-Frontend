import React from 'react'
import { ModalComponent } from '../styles/Modal.styled'

export default function Modal({ children }) {
    return (
        <ModalComponent>
            <div className="modal">
                {children}
            </div>
        </ModalComponent>
    )
}

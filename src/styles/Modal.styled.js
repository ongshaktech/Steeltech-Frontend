import styled from 'styled-components';

export const ModalComponent = styled.div`
    position: fixed;
    /* position: absolute; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    .modal {
        position: relative;
        padding: 30px;
        max-width: 580px;
        margin: 0 auto;
        top: 50%;
        transform: translateY(-50%);
        background: #fff;
        border-radius: 10px;
    
        .button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #000;
            color: #fff;
            width: 5rem;
            height: 5rem;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }
`
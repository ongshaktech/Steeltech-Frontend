import styled from 'styled-components';

export const NavSidebar = styled.nav`
    min-width: 10rem;
    width: 10rem;
    max-height: 100vh;
    background: #fff;
    color: #000;
    border: 1px solid #ddd;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    position: sticky;
    top: 0;
    left: 0;
    
    div {
        cursor: pointer;
        padding: 1rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .2s;

        :hover {
            background: #ddd;
        }
        svg {
            width: 3.5rem;
            height: 3.5rem;
        }
    }
`
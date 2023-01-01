import styled from 'styled-components';

export const DashboardContent = styled.section`
    color: #000;
    background: #E5E5E5;
    flex-grow: 1;
    padding: 5rem;
`

export const PaginationButton = styled.div`
    padding: 1rem;
    margin: auto;
    max-width: 25rem;

    button {
        padding: .8rem;
        width: 10rem;
        cursor: pointer;
        background-color: #00b6cd;
        color: white;
        border-radius: 0.5rem;
        outline: none;
        border: none;
    }

    button:hover{
        background-color: #006875;
    }

    button:first-child{
        float: left;
    }
    button:last-child{
        float: right;
    }
`;
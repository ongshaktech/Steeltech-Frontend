import styled from 'styled-components';

export const WebWrapper = styled.section`
    display: flex;
    min-height: 100vh;
    width: 100%;
`

export const GridTwo = styled.div`
    display: Grid;
    width: ${({ width }) => width || ""};
    gap: ${({ gap }) => gap || "2rem"};
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns:  ${({ column }) => column || "repeat(2, 1fr)"};
    align-items: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: 1fr;
        text-align:center;
    }
    @media (max-width: ${({ theme }) => theme.smallMobile}) {
        gap: 1rem;
    }
`


export const GridFour = styled.div`
    display: Grid;
    gap: ${({ gap }) => gap || "2rem"};
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: ${({ theme }) => theme.smallMobile}) {
        grid-template-columns: 1fr;
        gap: 1rem;
        text-align: center;
    }
`

export const GridThree = styled.div`
    display: Grid;
    gap: ${({ gap }) => gap || "2rem"};
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: 1fr;
    }
    /* @media (max-width: ${({ theme }) => theme.smallMobile}) {
        grid-template-columns: 1fr;
        gap: 1rem;
        text-align: center;
    } */
`


export const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ justify }) => justify || "center"};
    gap: ${({ gap }) => gap || "2rem"};
    & > div {
        flex: 1;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        /* text-align: center; */
    }
`

export const Button = styled.button`
    background: ${({ bg }) => bg || "#000"};
    color: ${({ color }) => color || "#fff"};
    padding: 1.5rem 3rem;
    cursor: pointer;
    border-radius: .8rem;
    border: none;
    font-size: 1.6rem;
    `

export const Select = styled.select`
    background: ${({ bg }) => bg || "#ddd"};
    color: ${({ color }) => color || "#000"};
    padding: 2rem;
    border-radius: .8rem;
    border: none;
    font-size: 1.6rem;
    margin-top: 1rem;
`
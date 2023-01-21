import styled from 'styled-components';

export const DownTimeWrapper = styled.div`
    background: #fff;
    padding: 2rem 1rem;
    border-radius: .8rem;
    display: Grid;
    align-items: center;
    justify-items: center;
    gap: ${({ gap }) => gap || "2rem"};
    grid-template-columns: 1fr;
    
    >div {
        padding: 2rem;
    }
`
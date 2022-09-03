import styled from 'styled-components';

export const DownTimeWrapper = styled.div`
    background: #fff;
    padding: 2rem 1rem;
    border-radius: .8rem;
    display: Grid;
    align-items: center;
    justify-items: center;
    gap: ${({ gap }) => gap || "2rem"};
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: 1fr;
    }

    >div {
        padding: 2rem;

        .date {
            padding: 3rem;
            margin: 3rem 0;
            border-radius: .8rem;
            background: #00B6CD;
            color: #fff;
            font-size: 3.2rem;
        }
    }
`
import styled from 'styled-components';

export const AnalyticsCard = styled.div`
    background: #fff;
    color: #000;
    border-radius: .8rem;
    padding: 4rem 2rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    
    .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        
        @media (max-width: 1400px) {
            grid-template-columns: 1fr;
        }
    }
`

export const AnalyticsDetail = styled.div`
    text-align: right;
    .detail {
        margin-bottom: 2rem;
        font-size: 1.6rem;
        span:first-child {
            font-weight: 700;
        }
    }

    .category {
        display: flex;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
        button, select {
            width: 100%;
            padding: 1rem;
            font-size: 1.6rem;
            cursor: pointer;
            background: #ddd;
            color: #000;
            margin: .5rem;
            border: none;
            border-radius: 5rem;
        }
        button:focus, button:hover, select:focus, select:hover {
            background: black;
            color: white;
        }
    }
`
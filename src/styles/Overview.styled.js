import styled from 'styled-components';
export const OverviewHeading = styled.div`
    font-size: 1.8rem;
    margin-bottom: 2rem;
`
export const OverviewWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 3rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: 1fr;
        text-align:center;
    }
`

export const OverAllCard = styled.div`
    background: #fff;
    border-radius: .8rem;
    padding: 2rem;
    
    .title_wraper {
        display: flex;
        gap: 2rem;
        align-items: center;
        :not(:last-child) {
            margin-bottom: 1rem;
        }
        div {
            width:35px;
            height: 10px;
            background: #d1d1d1;
        }
    }
`
export const MachineCard = styled.div`
    background: #fff;
    border-radius: .8rem;
    padding: 2rem;

    display: grid;
    grid-template-columns: minmax(300px, 1fr) 2fr;
    align-items: center;

    .machine_Details {

        padding: 2rem;
        p {
            font-size: 1.8rem;
        }
        .machine_number {
            padding: 3rem;
            margin: 3rem 0;
            border-radius: .8rem;
            background: #E65192;
            color: #fff;
            font-size: 3.2rem;
        }
    }

    .machine_chart {
        
    }
`
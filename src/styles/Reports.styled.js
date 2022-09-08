import styled from 'styled-components';

export const ReportHeadingWrapper = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    p {
        font-size: 1.8rem;
    }

    .right {
        display: flex;
        gap: 2rem;
        align-items: center;

        input {
            padding: 1rem 2rem;
            border: 1px solid #ddd;
            border-radius: .4rem;
            :focus {
                outline: none;
            }
        }
    }

`
export const ReportTableWrapper = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: .8rem;
    .table_heading {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        align-items: center;
        /* justify-items: center; */
        gap: 1rem;
        margin-bottom: 2rem;
        font-size: 1.8rem;
        font-weight: 700;
    }
    
    .table_content {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        align-items: center;
        gap: 1rem;
        font-size: 1.6rem;
        margin-bottom: .8rem;
        margin-top: .8rem;
        text-align: center;
    }


    .divider{
        color: #dcdbdb;
        border-width: 1px;
        border-color: aliceblue;
    }
`
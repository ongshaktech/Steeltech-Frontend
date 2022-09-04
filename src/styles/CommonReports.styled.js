import styled from 'styled-components';

export const ReportsWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
`

export const ReportDetails = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: .8rem;
    .table_heading {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        font-size: 1.8rem;
        font-weight: 700;
        text-align: center;
    }
    
    .table_content {
        text-align: center;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
        gap: 1rem;
        font-size: 1.6rem;
        margin-bottom: .8rem;
        margin-top: .8rem;
    }

    .divider{
        color: #dcdbdb;
        border-width: 1px;
        border-color: aliceblue;
    }
`

export const ReportsFormContainer = styled.div`
    background: ${({ bg }) => bg || "#000"};
    color: ${({ color }) => color || "#fff"};
    padding: 2rem;
    border-radius: .8rem;
    h3 {
        font-size: 2rem;
    }
    form {
        label {
            display: flex;
            gap: 2rem;
            justify-content: space-between;
            align-items: center;
            font-size: 1.6rem;
            :not(:last-child) {
                margin-bottom: 1rem;
            }

            p {
                width: 10rem;
            }

            input, select {
                border: none;
                padding: 1rem 2rem;
                flex-grow: 4;
                border-radius: .4rem;
                :focus {
                    outline: none;
                }
            }

        }
        .submit {
            display: block;
            padding: 1.5rem 2rem;
            background: #F9A826;
            border: none;
            font-size: 1.8rem;
            border-radius: .4rem;
            margin: 0 auto;
            cursor: pointer;
        }
    }
`
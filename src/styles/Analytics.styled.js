import styled from 'styled-components';

export const AnalyticsCard = styled.div`
    background: #fff;
    color: #000;
    border-radius: .8rem;
    padding: 4rem 2rem;

    select{
        width: 10rem;
        padding: 1rem;
        font-size: 1.4rem;
        cursor: pointer;
        background: transparent;
        color: #000;
        margin: .5rem;
        text-align: center;
        outline: none;
        border-radius: 0.5rem;
        border-style: solid;
        border-color: #5d5e5d;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    .recharts-wrapper{
        margin: auto;
    }
`

export const AnalyticsDetail = styled.div`
    max-width: 100rem;
    margin: 0 auto;

    .msgDiv {
        color: orange;
        font-size: 1.5rem;
        padding: 1rem;
    }
    .upperContainer{
        margin-top: 2rem;
        
        select {
            background-color: white;
            margin: .8rem .8rem .8rem 1.2rem;
            outline: none;
            border-radius: .5rem;
            border-style: solid;
            border-color: #5d5e5d;
            height: 4rem;
            padding: 1rem;
            border-width: 1px;
            width: 16rem;
            font-size: 1.3rem;
        }
        button {
            width: 8rem;
            padding: 1rem;
            font-size: 1.6rem;
            cursor: pointer;
            background: #2e976a;
            color: white;
            margin: .5rem;
            border: none;
            border-radius: .8rem;
        }
        button:hover, button:focus{
            background: #1c5b40;
        }
    }

    .detail {
        margin-bottom: 2rem;
        font-size: 1.6rem;
        span:first-child {
            font-weight: 700;
        }
    }

    .status-header{
        text-align: center;
        font-size: 2.5rem;
        color: #494949;
    }

    .category {
        display: flex;
        margin: 1.5rem 0 1.5rem 0;

        button, select, input {
            outline: none;
            width: 100%;
            padding: 1rem;
            font-size: 1.6rem;
            cursor: pointer;
            background: cornflowerblue;
            color: white;
            font-weight: bold;
            margin: .5rem;
            border: none;
            border-radius: .8rem;
        }
        input[type="date"]{
            border-radius: .8rem 0rem 0rem .8rem;
            width: 95%;
            margin-right: 0;
            color-scheme: dark;
        }
        .date-btn {
            border-radius: 0rem .8rem .8rem 0rem;
            width: 16rem;
            margin-left: 0;
            background-color: lightblue;
            font-weight: bold;
            color: #3c3b3b;
            cursor: pointer;
        }

        button:focus, button:hover, select:focus, select:hover, input:hover, input:focus {
            background: black;
            color: white;            
        }
        input {
            text-align: center;
        }
    }
`
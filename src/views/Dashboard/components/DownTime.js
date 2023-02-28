import React, { useEffect } from 'react';
import { LineChart, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
// import { Select } from '../../../styles/Common.styled';
import { DownTimeWrapper } from '../../../styles/DownTime.styled';
import { Section } from '../../../styles/Sections.styled';
import split_time from './GraphTime';
import { where, query, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { db_firestore } from '../../../Hooks/config';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { useRef } from 'react';


export default function DownTime() {
    let dateInput = useRef('');
    let [graphData, setGraphData] = useState([]);
    let [machineNumList, setMachineNumList] = useState([]);
    let [DataPeriod, setDataPeriod] = useState(new Date());
    let [machine_number, setMachine_number] = useState('');


    useEffect(() => {

        // Setting today's Data
        var date = new Date();
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var today = date.getFullYear() + "-" + (month) + "-" + (day);
        dateInput.current.value = today;

        // Collecting Machine No. list
        const ref = doc(db_firestore, `information`, 'info');

        getDoc(ref).then(data => {
            let numList = [];
            const list = data.data();

            numList.push(<optgroup label='Forming Machines'></optgroup>)
            list['forming_machine'].forEach((num, index) => {
                numList.push(<option key={index} value={num}>Machine {num}</option>)
            });

            numList.push(<optgroup label='Polish Machines'></optgroup>)
            list['polish_machine'].forEach((num, index) => {
                numList.push(<option key={index + numList.length} value={num}>Machine {num}</option>)
            });

            setMachineNumList(numList);
        });

    }, []);



    const setData = () => {
        if (machine_number !== '') {
            let graphDataArr = [];

            // Custom data filtering
            let startDate = new Date(DataPeriod);
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setMilliseconds(0);
            startDate.setSeconds(0);

            let endDate = new Date(DataPeriod);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setMilliseconds(99);
            endDate.setSeconds(59);

            startDate = Math.floor(startDate.getTime() / 1000);
            endDate = Math.floor(endDate.getTime() / 1000);

            // console.log(startDate, endDate);

            const ref = collection(db_firestore, 'machineStatus');
            const q = query(ref, where('time_start', '>=', startDate),
                where('time_start', '<=', endDate),
                where('machine_no', '==', machine_number)
            );

            
            getDocs(q).then(
                (snapShot) => {
                    snapShot.forEach((doc) => {
                        Array.prototype.push.apply(graphDataArr, split_time(3600, doc.data()));
                    });
                    setGraphData(graphDataArr);
                }
            );
        }
    }


    return (
        <Section bg="#fff">
            <DownTimeWrapper>
                <div>
                    <h6 style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>Downtime Status Per Machine</h6>
                    <LineChart width={950} height={300} data={graphData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                    </LineChart>
                </div>


                <AnalyticsDetail>
                    <div className='category'>
                        <select onChange={(e) => {
                            setMachine_number(e.target.options[e.target.selectedIndex].value);
                        }}>
                            <option selected disabled>Select Machine</option>
                            {machineNumList}
                        </select>

                        <input type="date" onChange={(e) => {
                            setDataPeriod((e.target.valueAsDate));
                        }} ref={dateInput} />

                        <button className='date-btn' onClick={setData}>
                            Set
                        </button>
                    </div>
                </AnalyticsDetail>

            </DownTimeWrapper>
        </Section>
    )
}

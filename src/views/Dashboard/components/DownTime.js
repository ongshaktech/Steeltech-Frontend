import React, { useEffect } from 'react';
import LineChartComponent from '../../../organism/LineChartComponent';
import { LineChart, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import { Select } from '../../../styles/Common.styled';
import { DownTimeWrapper } from '../../../styles/DownTime.styled';
import { Section } from '../../../styles/Sections.styled';
import split_time from './GraphTime';
import { where, query, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db_firestore } from '../../../Hooks/config';
import { MachineNo } from '../../../shared/constants';


export default function DownTime() {
    let [graphData, setGraphData] = useState([]);
    let [DataPeriod, setDataPeriod] = useState('daily');
    let [machine_number, setMachine_number] = useState('');

    useEffect(
        () => {

            if (machine_number !== '') {
                let graphDataArr = [];

                // Daily Data
                if (DataPeriod === 'daily') {
                    let todayDate = new Date();
                    todayDate.setHours(0);
                    todayDate.setMinutes(0);
                    todayDate.setMilliseconds(0);
                    todayDate.setSeconds(0);
                    todayDate = Math.floor(todayDate.getTime() / 1000);

                    const ref = collection(db_firestore, 'machineStatus');
                    const q = query(ref, where('time_start', '>=', todayDate), where('machine_no', '==', machine_number));
                    getDocs(q).then(
                        (snapShot) => {
                            snapShot.forEach((doc) => {
                                Array.prototype.push.apply(graphDataArr, split_time(3600, doc.data()));
                            });
                            setGraphData(
                                graphDataArr
                            );
                        }
                    );
                }

                // Custom data filtering
                else {
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

                    console.log(startDate, endDate);

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
                            console.log(graphDataArr);
                            setGraphData(
                                graphDataArr
                            );
                        }
                    );
                }
            }

        }, [DataPeriod, machine_number]
    );


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
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div>
                    <Select bg="#0071FF" color="#fff" onChange={(e) => {
                        setMachine_number(e.target.options[e.target.selectedIndex].value);
                    }}>
                        <option selected disabled>Select Machine</option>
                        {
                            MachineNo.map(
                                (machine) => <option value={machine}>Machine {machine}</option>
                            )
                        }
                    </Select>

                    <input type="date" onChange={(e) => {
                        setDataPeriod((e.target.valueAsDate));
                    }} />

                </div>

            </DownTimeWrapper>
        </Section>
    )
}

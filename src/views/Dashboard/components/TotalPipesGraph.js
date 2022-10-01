import React, { useEffect, useState } from 'react';
import { Section } from '../../../styles/Sections.styled';
// import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { MachineNo } from '../../../shared/constants';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs } from 'firebase/firestore';

export default function TotalPipesGraph() {

    let [graphData, setGraphData] = useState([]);
    let [DataPeriod, setDataPeriod] = useState('daily');
    const collection_name = '*machines';

    useEffect(
        () => {
            let graphDataArr = [];


            // Daily Data
            if (DataPeriod === 'daily') {
                let todayDate = new Date();
                todayDate.setHours(0);
                todayDate.setMinutes(0);
                todayDate.setMilliseconds(0);
                todayDate.setSeconds(0);
                todayDate = Math.floor(todayDate.getTime() / 1000); // Date to Unix format

                MachineNo.map(
                    (machine, index) => {
                        const ref = collection(db_firestore, collection_name);
                        const q = query(ref, where('unix_time', '>=', todayDate), where('machine_no', '==', machine));
                        getDocs(q).then(
                            (snapShot) => {
                                let count = 0;
                                let Weight = 0;

                                snapShot.forEach((doc) => {
                                    count += parseFloat(doc.data()['count']);
                                    Weight += parseFloat(doc.data()['weight']);
                                });
                                graphDataArr.push({
                                    name: machine,
                                    pipes: count,
                                    'Total weight': Weight,
                                    'Average Pipe Weight': (Weight / count).toFixed(2)
                                });

                                // Set data if the loop will complete and Array is fully pushed
                                if (MachineNo.length === index + 1) {
                                    setGraphData(
                                        graphDataArr
                                    );
                                }
                            }
                        );
                    }
                );
            }

            // Yearly data filtering
            else if (DataPeriod === 'yearly') {
                let startDate = new Date();
                startDate.setMonth(0);
                startDate.setDate(1);
                startDate.setHours(0);
                startDate.setMinutes(0);
                startDate.setMilliseconds(0);
                startDate.setSeconds(0);
                startDate = Math.floor(startDate.getTime() / 1000);

                let endDate = new Date();
                endDate.setMonth(12);
                endDate.setDate(0);
                endDate.setHours(0);
                endDate.setMinutes(0);
                endDate.setMilliseconds(0);
                endDate.setSeconds(0);
                endDate = Math.floor(endDate.getTime() / 1000);


                MachineNo.map(
                    (machine, index) => {
                        const ref = collection(db_firestore, collection_name);
                        const q = query(ref, where('unix_time', '>=', startDate), where('unix_time', '<=', endDate),
                            where('machine_no', '==', machine)
                        );
                        getDocs(q).then(
                            (snapShot) => {
                                let count = 0;
                                let Weight = 0;

                                snapShot.forEach((doc) => {
                                    count += parseFloat(doc.data()['count']);
                                    Weight += parseFloat(doc.data()['weight']);
                                });
                                graphDataArr.push({
                                    name: machine,
                                    pipes: count,
                                    'Total weight': Weight,
                                    'Average Pipe Weight': (Weight / count).toFixed(2)
                                });

                                // Set data if the loop will complete and Array is fully pushed
                                if (MachineNo.length === index + 1) {
                                    setGraphData(
                                        graphDataArr
                                    );
                                }
                            }
                        );
                    }
                );
            }

            // Monthly data filtering
            else {
                let startDate = new Date();
                startDate.setMonth(DataPeriod);
                startDate.setDate(1);
                startDate.setHours(0);
                startDate.setMinutes(0);
                startDate.setMilliseconds(0);
                startDate.setSeconds(0);
                startDate = Math.floor(startDate.getTime() / 1000);
                

                let endDate = new Date();
                endDate.setMonth(DataPeriod + 1);
                endDate.setDate(0);
                endDate.setHours(0);
                endDate.setMinutes(0);
                endDate.setMilliseconds(0);
                endDate.setSeconds(0);
                endDate = Math.floor(endDate.getTime() / 1000);

                MachineNo.map(
                    (machine, index) => {
                        const ref = collection(db_firestore, collection_name);
                        const q = query(ref, where('unix_time', '>=', startDate), where('unix_time', '<=', endDate),
                            where('machine_no', '==', machine)
                        );
                        getDocs(q).then(
                            (snapShot) => {
                                let count = 0;
                                let Weight = 0;

                                snapShot.forEach((doc) => {
                                    count += parseFloat(doc.data()['count']);
                                    Weight += parseFloat(doc.data()['weight']);
                                });
                                graphDataArr.push({
                                    name: machine,
                                    pipes: count,
                                    'Total weight': Weight,
                                    'Average Pipe Weight': (Weight / count).toFixed(2)
                                });

                                // Set data if the loop will complete and Array is fully pushed
                                if (MachineNo.length === index + 1) {
                                    setGraphData(
                                        graphDataArr
                                    );
                                }
                            }
                        );
                    }
                );


            }

        }, [DataPeriod]
    );

    return (
        <Section>
            <AnalyticsCard>
                <h2>Production Details</h2>
                <div className='content'>
                    <div style={{ width: "100%" }}>

                        {/* BarChartComponent */}
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={600} height={300} data={graphData} margin={{
                                    top: 5,
                                    right: 20,
                                    left: 30,
                                    bottom: 5,
                                }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pipes" fill="#8884d8" />
                                    <Bar dataKey="Total weight" fill="#FFA500" />
                                    <Bar dataKey="Average Pipe Weight" fill="#6aa32e" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* BarChartComponent */}


                    </div>


                    {/* AnalyticsDetails */}
                    <AnalyticsDetail>
                        <div className='category'>
                            <button onClick={() => {
                                setDataPeriod('daily');
                            }} autoFocus>Daily</button>

                            <select onChange={(e) => {
                                setDataPeriod(parseInt(e.target.options[e.target.selectedIndex].value));
                            }}>
                                <option selected disabled>Monthly</option>
                                <option value={0}>January</option>
                                <option value={1}>February</option>
                                <option value={2}>March</option>
                                <option value={3}>April</option>
                                <option value={4}>May</option>
                                <option value={5}>June</option>
                                <option value={6}>July</option>
                                <option value={7}>August</option>
                                <option value={8}>September</option>
                                <option value={9}>October</option>
                                <option value={10}>November</option>
                                <option value={11}>December</option>
                            </select>

                            <button onClick={() => {
                                setDataPeriod('yearly')
                            }}>Yearly</button>
                        </div>
                    </AnalyticsDetail>
                    {/* AnalyticsDetails */}
                </div>
            </AnalyticsCard>

        </Section>
    )
}

import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../../../styles/Sections.styled';
// import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { MachineNo } from '../../../shared/constants';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs } from 'firebase/firestore';

export default function TotalPipesGraph() {


    const collection_name = 'machines';
    const currentYear = parseInt(new Date().getFullYear());
    let dateRef = useRef('');

    let [graphData, setGraphData] = useState([]);
    let [year, setYear] = useState(currentYear);
    let [status, setStatus] = useState('');


    // set todays date to input initially
    useEffect(() => {
        dateRef.current.valueAsDate = new Date();

        let startDate = new Date(dateRef.current.value);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateRef.current.value);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        putGraphData(startDate, endDate);
        setStatus(`Showing Daily Graph of ${dateRef.current.value}`);

    }, []);



    // Update State if year is changed
    let [lastEvent, setLastEvent] = useState(null);
    let [filter, setFilter] = useState('daily');

    useEffect(() => {
        if (filter === 'monthly') monthlyGraph(lastEvent);
        else if (filter === 'yearly') yearlyGraph(null);
    }, [year])



    // Query in firestore DB and plot data on graph
    const putGraphData = (startDate, endDate) => {

        let graphDataArr = [];

        MachineNo.map(
            (machine, index) => {
                const ref = collection(db_firestore, collection_name);
                const q = query(ref,
                    where('unix_time', '>=', Math.floor(startDate.getTime() / 1000)),
                    where('unix_time', '<=', Math.floor(endDate.getTime() / 1000)),
                    where('machine_no', '==', machine)
                );
                getDocs(q).then(
                    (snapShot) => {
                        let count = 0;
                        let Weight = 0;

                        snapShot.forEach((doc) => {
                            count += parseFloat(doc.data()['count']);
                            Weight += parseFloat(doc.data()['weight']);
                            // console.log(doc.data());
                        });
                        graphDataArr.push({
                            name: machine,
                            pipes: count,
                            'Total weight': Weight,
                            'Average Pipe Weight': (Weight / count).toFixed(2)
                        });

                        // Set data if the loop will complete and Array is fully pushed
                        if (MachineNo.length === index + 1) {
                            setGraphData(graphDataArr);
                        }
                    }
                );
            }
        );
    }



    // Filtering Cronologically
    const dailyGraph = (e) => {
        let startDate = new Date(dateRef.current.value);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateRef.current.value);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        putGraphData(startDate, endDate);

        setStatus(`Showing Daily Graph of ${dateRef.current.value}`);

        setFilter('daily')
    }


    const monthlyGraph = (e) => {
        let monthIndex = parseInt(e.target.options[e.target.selectedIndex].value);

        let startDate = new Date();
        startDate.setFullYear(year);
        startDate.setMonth(monthIndex);
        startDate.setDate(1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setMilliseconds(0);
        startDate.setSeconds(0);

        let endDate = new Date();
        endDate.setFullYear(year);
        endDate.setMonth(monthIndex + 1);
        endDate.setDate(0);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setMilliseconds(0);
        endDate.setSeconds(0);

        putGraphData(startDate, endDate);
        setStatus(`Showing Monthly Graph of ${e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text}, ${year}`);
        setFilter('monthly');
        setLastEvent(e);
    }



    const yearlyGraph = (_) => {

        let startDate = new Date();
        startDate.setFullYear(year);
        startDate.setMonth(0);
        startDate.setDate(1);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setMilliseconds(0);
        startDate.setSeconds(0);

        let endDate = new Date();
        endDate.setFullYear(year);
        endDate.setMonth(12);
        endDate.setDate(0);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setMilliseconds(0);
        endDate.setSeconds(0);

        putGraphData(startDate, endDate);
        setStatus(`Showing Yearly Graph of ${year}`);
        setFilter('yearly');
    }


    return (
        <Section>
            <AnalyticsCard>
                <h2>
                    Production Details of &nbsp;

                    <select onChange={(e) => {
                        setYear(parseInt(e.target.options[e.target.selectedIndex].value));
                    }}>
                        <option value={currentYear}>{currentYear}</option>
                        <option value={currentYear - 1}>{currentYear - 1}</option>
                        <option value={currentYear - 2}>{currentYear - 2}</option>
                        <option value={currentYear - 3}>{currentYear - 3}</option>
                        <option value={currentYear - 4}>{currentYear - 4}</option>
                    </select>
                </h2>

                <div>
                    <div style={{ width: "100%" }}>

                        {/* BarChartComponent */}
                        <div style={{ width: '100%', height: '300px' }}>
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

                            <input type="date" ref={dateRef} autoFocus />

                            <button className='date-btn' onClick={dailyGraph}>
                                set
                            </button>

                            <select onChange={monthlyGraph}>
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

                            <button onClick={yearlyGraph}>
                                Yearly
                            </button>
                        </div>

                        <h1 className='status-header'>
                            {status}
                        </h1>
                    </AnalyticsDetail>
                    {/* AnalyticsDetails */}
                </div>
            </AnalyticsCard>
        </Section>
    );
}

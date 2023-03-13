import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../../../styles/Sections.styled';
// import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { MachineNo } from '../../../shared/constants';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs, getDoc, doc } from 'firebase/firestore';

export default function TotalPipesGraph() {

    const collection_name = 'machinesIndividual';
    const currentYear = parseInt(new Date().getFullYear());
    let dateRef = useRef('');

    let [graphData, setGraphData] = useState([]);
    let [year, setYear] = useState(currentYear);
    let [status, setStatus] = useState('');
    let [machineNumListDiv, setMachineNumListDiv] = useState([]);
    let [MachineNo, setMachineNo] = useState([]);


    useEffect(() => {
        // set todays date to input initially
        dateRef.current.valueAsDate = new Date();

        // let startDate = new Date(dateRef.current.value);
        // startDate.setHours(0);
        // startDate.setMinutes(0);
        // startDate.setSeconds(0);

        // let endDate = new Date(dateRef.current.value);
        // endDate.setHours(23);
        // endDate.setMinutes(59);
        // endDate.setSeconds(59);

        // putGraphData(startDate, endDate);
        // setStatus(`Showing Daily Graph of ${dateRef.current.value}`);
        setStatus('Select a machine number range');


        // set todays date to input initially & Get Machine No.
        const ref = doc(db_firestore, `information`, 'info');

        getDoc(ref).then(data => {
            let numList = [];
            const list = data.data();
            let TempMachine = [];

            // Setting Range in Machine List. Eituku dekhe matha gorom na korleo hobe
            numList.push(<optgroup label='Forming Machines'></optgroup>);
            list['forming_machine'].forEach((num, index) => {
                TempMachine.push(num);
                if ((index + 1) % 3 === 0) {
                    numList.push(<option key={index} value={TempMachine}>
                        {TempMachine[0]}
                        {TempMachine[1] ? `, ${TempMachine[1]}` : ''}
                        {TempMachine[2] ? `, ${TempMachine[2]}` : ''}
                    </option>);
                    TempMachine = [];
                }
            });

            if (TempMachine.length !== 0) {
                numList.push(<option key="x" value={TempMachine}>
                    {TempMachine[0]}
                    {TempMachine[1] ? `, ${TempMachine[1]}` : ''}
                    {TempMachine[2] ? `, ${TempMachine[2]}` : ''}
                </option>);
            }
            TempMachine = [];


            numList.push(<optgroup label='Polish Machines'></optgroup>);
            list['polish_machine'].forEach((num, index) => {
                TempMachine.push(num);
                if ((index + 1) % 3 === 0) {
                    numList.push(<option key={index + numList.length} value={TempMachine}>
                        {TempMachine[0]}
                        {TempMachine[1] ? `, ${TempMachine[1]}` : ''}
                        {TempMachine[2] ? `, ${TempMachine[2]}` : ''}
                    </option>);
                    TempMachine = [];
                }
            });

            if (TempMachine.length !== 0) {
                numList.push(<option key="y" value={TempMachine}>
                    {TempMachine[0]}
                    {TempMachine[1] ? `, ${TempMachine[1]}` : ''}
                    {TempMachine[2] ? `, ${TempMachine[2]}` : ''}
                </option>);
            }
            TempMachine = [];

            setMachineNumListDiv(numList);
        });

    }, []);



    // Update State if year is changed
    let [lastEvent, setLastEvent] = useState(null);
    let [filter, setFilter] = useState('');

    useEffect(() => {
        if (filter !== '') {
            if (filter === 'daily') dailyGraph(null);
            else if (filter === 'monthly') monthlyGraph(lastEvent);
            else if (filter === 'yearly') yearlyGraph(null);
        }
        else if (MachineNo.length !== 0) {
            setStatus('Now select timespan')
        }

        console.log(year);

    }, [year, MachineNo]);



    // Query in firestore DB and plot data on graph
    const putGraphData = (startDate, endDate) => {

        let graphDataArr = [];

        // console.log(MachineNo, MachineNo.length)

        MachineNo.length === 0 ?

            setStatus('Please Select a Range First') :

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
                                Pipes: count,
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
    const dailyGraph = (_) => {
        let startDate = new Date(dateRef.current.value);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateRef.current.value);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        setStatus(`Showing Daily Graph of ${dateRef.current.value}`);
        putGraphData(startDate, endDate);
        setFilter('daily');
    }


    const monthlyGraph = (e) => {
        if (e.detail === 0) {
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
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setMilliseconds(0);
            endDate.setSeconds(59);

            // console.log(startDate, endDate);

            setStatus(`Showing Monthly Graph of ${e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text}, ${year}`);
            putGraphData(startDate, endDate);
            setFilter('monthly');
            setLastEvent(e);
        }
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
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setMilliseconds(0);
        endDate.setSeconds(59);

        // console.log(startDate, endDate);

        setStatus(`Showing Yearly Graph of ${year}`);
        putGraphData(startDate, endDate);
        setFilter('yearly');
    }


    return (
        <Section>
            <AnalyticsCard>
                <h2>
                    Production Details of &nbsp;

                    <select onChange={(e) => {
                        setYear(parseInt(e.target.value));
                    }}>
                        <option value={currentYear}>{currentYear}</option>
                        <option value={currentYear - 1}>{currentYear - 1}</option>
                        <option value={currentYear - 2}>{currentYear - 2}</option>
                        <option value={currentYear - 3}>{currentYear - 3}</option>
                        <option value={currentYear - 4}>{currentYear - 4}</option>
                    </select>

                    <select style={{ width: '20rem' }} onChange={(e) => {
                        setMachineNo(e.target.options[e.target.selectedIndex].value.split(','));
                    }}>
                        <option selected disabled value="">Select Machine Range</option>
                        {machineNumListDiv}
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
                                    <Bar dataKey="Pipes" fill="#8884d8" />
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

                            <input type="date" ref={dateRef} />

                            <button className='date-btn' onClick={dailyGraph}>
                                Set
                            </button>

                            <select onClick={monthlyGraph}>
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

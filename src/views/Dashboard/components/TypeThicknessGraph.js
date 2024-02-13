import React, { useEffect, useState } from 'react';
import { Section } from '../../../styles/Sections.styled';
// import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { ProductTypes, ProductThickness } from '../../../shared/constants';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { useRef } from 'react';

export default function TypeThicknessGraph() {

    const collection_name = 'machinesIndividual';
    const currentYear = parseInt(new Date().getFullYear());
    let thicknessInput = useRef('');
    let machineNoInput = useRef('');
    let dateRef = useRef('');


    let [year, setYear] = useState(currentYear);
    let [graphData, setGraphData] = useState([]);
    let [machineNumList, setMachineNumList] = useState([]);
    let [ProductData, setProductData] = useState({});
    let [status, setStatus] = useState('Select Product Thickness');
    let [machine, setMachine] = useState('Machine and Product is not selected');
    let [msg, setMsg] = useState('');


    // set todays date to input initially & Get Machine No.
    useEffect(() => {
        dateRef.current.valueAsDate = new Date();

        const ref = doc(db_firestore, `information`, 'info');

        getDoc(ref).then(data => {
            let numList = [];
            const list = data.data();

            numList.push(<optgroup label='Forming Machines'></optgroup>)
            list['forming_machine'].forEach((num, index) => {
                numList.push(<option key={index} defaultValue={num}>{num}</option>)
            });

            numList.push(<optgroup label='Polish Machines'></optgroup>)
            list['polish_machine'].forEach((num, index) => {
                numList.push(<option key={index + numList.length} defaultValue={num}>{num}</option>)
            });

            setMachineNumList(numList);
        });

    }, []);


    // Query in firestore DB and plot data on graph
    const putGraphData = (startDate, endDate) => {

        let graphDataArr = [];

        ProductTypes.map(
            (product_type, index) => {
                const ref = collection(db_firestore, collection_name);
                const q = query(ref,
                    where('unix_time', '>=', Math.floor(startDate.getTime() / 1000)),
                    where('unix_time', '<=', Math.floor(endDate.getTime() / 1000)),
                    where('machine_no', '==', ProductData.machineNo),
                    where('thickness', '==', ProductData.thickness),
                    where('product_type', '==', product_type)
                );
                getDocs(q).then(
                    (snapShot) => {
                        let count = 0;
                        let Weight = 0;

                        snapShot.forEach((doc) => {
                            if (parseFloat(doc.data()['weight']) > 0) {
                                count += parseFloat(doc.data()['count']);
                                Weight += parseFloat(doc.data()['weight']);
                            }
                        });
                        graphDataArr.push({
                            name: product_type,
                            Pipes: count,
                            Weight: Weight
                        });

                        // Set data if the loop will complete and Array is fully pushed
                        if (ProductTypes.length === index + 1) {
                            setGraphData(
                                graphDataArr
                            );
                        }
                    }
                );
            }
        );
    }


    // Filtering Cronologically
    const dailyGraph = (e) => {
        if (Object.keys(ProductData).length !== 0) {
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
        }
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

            putGraphData(startDate, endDate);
            setStatus(`Showing Monthly Graph of ${e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text}, ${year}`);

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

        putGraphData(startDate, endDate);
        setStatus(`Showing Yearly Graph of ${year}`);
    }

    const set_product = () => {
        // Show Msg and set value
        if (thicknessInput.current.value !== '' && machineNoInput.current.options[machineNoInput.current.selectedIndex].value !== '') {
            setProductData({
                thickness: thicknessInput.current.value,
                machineNo: machineNoInput.current.options[machineNoInput.current.selectedIndex].value
            });
            setMachine(`Machine No: ${machineNoInput.current.options[machineNoInput.current.selectedIndex].value}, Product Thickness: ${thicknessInput.current.value}`);
            setStatus('Now Select Time Span');
            setMsg('Set!');
        }
        else {
            setMsg('Please Fill up the fields correctly!');
        }

        window.setTimeout(() => {
            setMsg('');
        }, 2000);
    }

    return (
        <Section>
            <AnalyticsCard>

                <h2>
                    Product Type and Thickness of &nbsp;
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
                                    <Bar dataKey="Pipes" fill="#8884d8" />
                                    <Bar dataKey="Weight" fill="rgb(255 137 79)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* BarChartComponent */}
                    </div>


                    {/* AnalyticsDetails */}
                    <AnalyticsDetail>

                        <div className='upperContainer'>
                            <select ref={thicknessInput}>
                                <option selected disabled value=''>Product Thickness</option>
                                {
                                    ProductThickness.map(
                                        (thickness) =>
                                            <option value={thickness}>{thickness}</option>
                                    )
                                }
                            </select>


                            <select ref={machineNoInput}>
                                <option selected disabled value=''>Machine No.</option>
                                {machineNumList}
                            </select>

                            <button onClick={set_product}>
                                Set
                            </button>
                        </div>

                        <p className='msgDiv'>
                            {msg}
                        </p>

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
                            <button onClick={yearlyGraph}>Yearly</button>
                        </div>

                        <h1 className='status-header'>
                            {machine}
                        </h1>

                        <h1 className='status-header'>
                            {status}
                        </h1>

                    </AnalyticsDetail>
                    {/* AnalyticsDetails */}
                </div>
            </AnalyticsCard>

        </Section>
    )
}

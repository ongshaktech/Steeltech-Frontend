import React, { useEffect, useState } from 'react';
import { Section } from '../../../styles/Sections.styled';
// import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { ProductTypes, MachineNo } from '../../../shared/constants';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs } from 'firebase/firestore';
import { useRef } from 'react';

export default function TypeThicknessGraph() {

    let [graphData, setGraphData] = useState([]);
    let [DataPeriod, setDataPeriod] = useState('daily');
    let [ProductData, setProductData] = useState({});

    let thicknessInput = useRef('');
    let machineNoInput = useRef('');

    useEffect(
        () => {
            if (Object.keys(ProductData).length !== 0) {
                let graphDataArr = [];

                // Daily Data
                if (DataPeriod === 'daily') {
                    let todayDate = new Date();
                    todayDate.setHours(0);
                    todayDate.setMinutes(0);
                    todayDate.setMilliseconds(0);
                    todayDate.setSeconds(0);
                    todayDate = Math.floor(todayDate.getTime() / 1000);

                    // console.log(ProductData.thickness, ProductData.type);

                    ProductTypes.map(
                        (product_type, index) => {
                            const ref = collection(db_firestore, 'machines');
                            const q = query(ref, where('unix_time', '>=', todayDate),
                                where('machine_no', '==', ProductData.machineNo),
                                where('thickness', '==', ProductData.thickness),
                                where('product_type', '==', product_type)
                            );
                            getDocs(q).then(
                                (snapShot) => {
                                    let count = 0;
                                    let Weight = 0;

                                    snapShot.forEach((doc) => {
                                        count += doc.data()['Count'];
                                        Weight += doc.data()['Weight'];
                                    });
                                    graphDataArr.push({
                                        name: product_type,
                                        pipes: count,
                                        weight: Weight
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

                    // console.log();

                    ProductTypes.map(
                        (product_type, index) => {
                            const ref = collection(db_firestore, 'machines');
                            const q = query(ref, where('unix_time', '>=', startDate),
                                where('unix_time', '<=', endDate),
                                where('machine_no', '==', ProductData.machineNo),
                                where('thickness', '==', ProductData.thickness),
                                where('product_type', '==', product_type)
                            );
                            getDocs(q).then(
                                (snapShot) => {
                                    let count = 0;
                                    let Weight = 0;

                                    snapShot.forEach((doc) => {
                                        count += doc.data()['Count'];
                                        Weight += doc.data()['Weight'];
                                    });
                                    graphDataArr.push({
                                        name: product_type,
                                        pipes: count,
                                        weight: Weight
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


                    ProductTypes.map(
                        (product_type, index) => {
                            const ref = collection(db_firestore, 'machines');
                            const q = query(ref, where('unix_time', '>=', startDate),
                                where('unix_time', '<=', endDate),
                                where('machine_no', '==', ProductData.machineNo),
                                where('thickness', '==', ProductData.thickness),
                                where('product_type', '==', product_type)
                            );
                            getDocs(q).then(
                                (snapShot) => {
                                    let count = 0;
                                    let Weight = 0;

                                    snapShot.forEach((doc) => {
                                        count += doc.data()['Count'];
                                        Weight += doc.data()['Weight'];
                                    });
                                    graphDataArr.push({
                                        name: product_type,
                                        pipes: count,
                                        weight: Weight
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
            }
        }, [DataPeriod, ProductData]
    );

    return (
        <Section>
            <AnalyticsCard>
                <h2>Product Type and Thickness</h2>
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
                                    <Bar dataKey="weight" fill="#ffd45e" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* BarChartComponent */}


                    </div>


                    {/* AnalyticsDetails */}
                    <AnalyticsDetail>

                        <div className='upperContainer'>
                            <input ref={thicknessInput} placeholder='Product Thickness' type="text" />
                            <select ref={machineNoInput}>
                                <option selected disabled>Machine No.</option>
                                {
                                    MachineNo.map(
                                        (machine) =>
                                            <option value={machine}>Machine {machine}</option>
                                    )
                                }

                            </select>
                            <button onClick={() => {
                                setProductData({
                                    thickness: thicknessInput.current.value,
                                    machineNo: machineNoInput.current.options[machineNoInput.current.selectedIndex].value
                                });
                            }}>
                                Set
                            </button>
                        </div>


                        <div className='category'>
                            <button onClick={() => {
                                setDataPeriod('daily');
                            }}>Daily</button>

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

import React, { useEffect, useState } from 'react';
import { GridTwo } from '../../../styles/Common.styled';
import { Section } from '../../../styles/Sections.styled';
import { Button, Select } from '../../../styles/Common.styled';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsDetail } from '../../../styles/Analytics.styled';
import { AnalyticsCard } from '../../../styles/Analytics.styled';
import { MachineNo } from '../../../shared/MachineNo';
import { db_firestore } from '../../../Hooks/config';
import { where, query, collection, getDocs } from 'firebase/firestore';

export default function TotalPipesGraph() {

    let [graphData, setGraphData] = useState([]);


    useEffect(
        () => {
            let graphDataArr = [];
            const todayDate = new Date();
            todayDate.setHours(0);
            todayDate.setMinutes(0);
            todayDate.setMilliseconds(0);
            todayDate.setSeconds(0);

            MachineNo.map(
                (machine, index) => {
                    const ref = collection(db_firestore, machine);
                    const q = query(ref, where('creatingDate', '>=', todayDate));
                    getDocs(q).then(
                        (snapShot) => {
                            let count = 0;
                            snapShot.forEach((doc) => {
                                count += doc.data()['Count'];
                            });
                            graphDataArr.push({
                                name: machine,
                                pipes: count
                            });
                            
                            // Set data if the loop will complete and Array is fully pushed
                            if (MachineNo.length == index + 1) {
                                setGraphData(
                                    graphDataArr
                                );
                            }
                        }
                    );
                }
            );



        }, []
    );

    return (
        <Section>
            <GridTwo>
                <AnalyticsCard>
                    <h2>Pipes Produced Per Machine</h2>
                    <div className='content'>
                        <div style={{ width: "100%" }}>

                            {/* BarChartComponent */}
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width={400} height={300} data={graphData} margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                        <Bar dataKey="pipes" fill="#8884d8" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            {/* BarChartComponent */}


                        </div>


                        {/* AnalyticsDetails */}
                        <AnalyticsDetail>
                            <div className='category'>
                                <div>
                                    <p>Monthly</p>
                                </div>
                                <div>
                                    <p>Daily</p>
                                </div>
                            </div>
                            <div className='detail'>
                                <p><span style={{ fontWeight: 700 }}>Highest Mass : </span><span>2000KG</span></p>
                                <p><span style={{ fontWeight: 700 }}>Machine No : </span><span>Ek9123</span></p>
                                <p><span style={{ fontWeight: 700 }}>Max/Minute : </span><span>200 KG/Minute</span></p>
                            </div>
                            <div>
                                <Button>View More</Button>
                            </div>
                            <div>
                                <Select bg="#0071FF" color="#fff">
                                    <option>Selected Machine</option>
                                    <option>RKt Machine</option>
                                    <option>ERT Machine</option>
                                </Select>
                            </div>
                        </AnalyticsDetail>
                        {/* AnalyticsDetails */}
                    </div>
                </AnalyticsCard>
            </GridTwo>
        </Section>
    )
}

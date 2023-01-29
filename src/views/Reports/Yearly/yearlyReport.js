import { useEffect } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { ProductTypes } from "../../../shared/constants";
import style from '../style.module.css';
import { useState } from "react";

export default function YearlyReport() {

    const collection_name = 'machines';
    let tableRef = useRef(null);
    let MachineNo = new Set([]);

    const currentYear = parseInt(new Date().getFullYear());
    let startYear = useRef(null);
    let endYear = useRef(null);

    let [btnStatus, setBtnStatus] = useState(true);
    let [MachineNoList, setMachineNoList] = useState(new Set([]));


    useEffect(() => {
        let MachineNo = new Set([]);
        // Get Machine Number List
        const ref = doc(db_firestore, `information`, 'info');
        getDoc(ref).then(data => {
            let list = data.data();
            list['forming_machine'].forEach(index => {
                MachineNo.add(index);
            });
            list['polish_machine'].forEach(index => {
                MachineNo.add(index);
            });
            setMachineNoList(MachineNo);
        });
    }, []);


    const generateReport = () => {
        let dataNum = 0;
        let startDate = new Date();
        startDate.setMilliseconds(0);
        startDate.setSeconds(0);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setDate(1);
        startDate.setMonth(0);
        startDate.setFullYear(startYear.current.value);

        setTableStatus('Please Be Patient ...');
        setBtnStatus(false);


        const putData = (dateInfo) => {
            let startDate = new Date(dateInfo);
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);

            let endDate = new Date(dateInfo);
            endDate.setMonth(11);
            endDate.setDate(31);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);

            console.log(startDate, endDate);

            const ref = collection(db_firestore, collection_name);

            Array.from(MachineNoList).map((machine_no, index_m) => {
                ProductTypes.map((value, index_p) => {
                    let morning_count = 0, morning_weight = 0;
                    let night_count = 0, night_weight = 0;
                    let TP = 0;
                    let TW = 0;
                    let doc_length = 0;

                    const q = query(ref,
                        where('unix_time', '>=', Math.floor(startDate.getTime() / 1000)),
                        where('unix_time', '<=', Math.floor(endDate.getTime() / 1000)),
                        where('machine_no', '==', machine_no),
                        where('product_type', '==', value)
                    );

                    getDocs(q).then(
                        (snapShot) => {
                            snapShot.forEach((doc) => {
                                doc_length++;
                                dataNum++;
                                const data = doc.data();
                                if (data['shift'] === 'Morning') {
                                    morning_count += data['count'];
                                    morning_weight += data['weight'];
                                }
                                else {
                                    night_count += data['count'];
                                    night_weight += data['weight'];
                                }
                            });

                            TP = morning_count + night_count;
                            TW = night_weight + morning_weight;
                            if (doc_length !== 0)
                                appendTableRow(
                                    startDate.getFullYear(), machine_no,
                                    value, morning_count, morning_weight, night_count, night_weight,
                                    TP, TW
                                );
                            if (((index_m + 1) * (index_p + 1)) === (MachineNoList.size * ProductTypes.length)) {
                                if (dataNum === 0) setTableStatus('No Data Available in this Date Range');
                                setBtnStatus(true);
                            }
                        }
                    );
                });
            });
        }


        for (let i = 0; i < (endYear.current.value - startYear.current.value + 1); i++) {
            putData(startDate);
            startDate.setFullYear(startDate.getFullYear() + 1);
        }

    }

    const setTableStatus = (prompt) => {
        tableRef.current.innerHTML =
            `<tr>
            <td class='${style.reportStatus}' id='reportStatus' colSpan="9">
                ${prompt}
            </td>
        </tr>`;
    }



    const appendTableRow = (date, machine_no, product_type, m_count, m_weight, n_count, n_weight, tp, tw) => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<tr>
        <td>${date}</td>
        <td>${machine_no}</td>
        <td>${product_type}</td>
        <td>${m_count}</td>
        <td>${m_weight}</td>
        <td>${n_count}</td>
        <td>${n_weight}</td>
        <td>${tp}</td>
        <td>${tw}</td>
        </tr>`;
        document.getElementById('reportStatus').style.display = 'none';
        tableRef.current.appendChild(tr);
    }


    return (
        <DashboardContent>
            <h1 className={style.heading}>
                Yearly Report
            </h1>

            <div className={style.rangeContainer} style={{ width: '39rem' }}>
                <select ref={startYear}>
                    <option value={currentYear}>{currentYear}</option>
                    <option value={currentYear - 1}>{currentYear - 1}</option>
                    <option value={currentYear - 2}>{currentYear - 2}</option>
                    <option value={currentYear - 3}>{currentYear - 3}</option>
                    <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>
                to
                <select ref={endYear}>
                    <option value={currentYear}>{currentYear}</option>
                    <option value={currentYear - 1}>{currentYear - 1}</option>
                    <option value={currentYear - 2}>{currentYear - 2}</option>
                    <option value={currentYear - 3}>{currentYear - 3}</option>
                    <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>

                <button onClick={generateReport} disabled={!btnStatus}>
                    {btnStatus ? 'Generate' : 'Please Wait ...'}
                </button>

                <button onClick={() => {
                    window.print();
                }}>
                    Print
                </button>
            </div>

            <div className={style.reportTable}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2">Year</th>
                            <th rowSpan="2">Machine No.</th>
                            <th rowSpan="2">Product Type</th>
                            <th colSpan="2">Morning</th>
                            <th colSpan="2">Night</th>
                            <th rowSpan="2">Total Product</th>
                            <th rowSpan="2">Total Weight</th>
                        </tr>
                        <tr>
                            <th>Product Count</th>
                            <th>Weight</th>
                            <th>Product Count</th>
                            <th>Weight</th>
                        </tr>
                    </thead>

                    <tbody ref={tableRef}>
                        <tr>
                            <td className={style.reportStatus} colSpan="9">
                                Plase Select a Date Range
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </DashboardContent>
    );
}
import { useEffect } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { ProductTypes } from "../../../shared/constants";
import style from '../style.module.css';
import { useState } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel-dev';
import { FaFileDownload } from "react-icons/fa";

export default function DailyReport() {

    const collection_name = 'machinesIndividual';
    let dateStartRef = useRef(null);
    let dateEndRef = useRef(null);
    let tableRef = useRef(null);
    let [btnStatus, setBtnStatus] = useState(true);
    let [MachineNoList, setMachineNoList] = useState(new Set([]));


    useEffect(() => {
        dateEndRef.current.valueAsDate = new Date();
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



    function generateReport() {
        let dataNum = 0;
        let startDate = new Date(dateStartRef.current.value);
        let endDate = new Date(dateEndRef.current.value);

        if (dateStartRef.current.value === "" || dateEndRef.current.value === "") {
            setTableStatus('Invalid Parameters!');
            return null;
        }
        else if (startDate.getTime() > endDate.getTime()) {
            setTableStatus('Start date should be less than End Date');
            return null;
        }

        setTableStatus('Please be Patient ...');
        setBtnStatus(false);

        async function putData(dateInfo) {

            let startDate = new Date(dateInfo);
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);

            let endDate = new Date(dateInfo);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);

            // console.log(startDate, endDate);

            const ref = collection(db_firestore, collection_name);

            Array.from(MachineNoList).map((machine_no, index_m) => {
                ProductTypes.map((value, index_p) => {

                    let morning_count = 0.0, morning_weight = 0.0;
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
                                    if (parseFloat(data['weight']) > 0) {
                                        morning_count += parseInt(data['count']);
                                        morning_weight += parseFloat(data['weight']);
                                    }
                                }
                                else {
                                    if (parseFloat(data['weight']) > 0) {
                                        night_count += parseInt(data['count']);
                                        night_weight += parseFloat(data['weight']);
                                    }
                                }
                            });

                            TP = (morning_count + night_count).toFixed(2);
                            TW = (night_weight + morning_weight).toFixed(2);

                            if (doc_length !== 0)
                                appendTableRow(
                                    `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
                                    machine_no, value, morning_count, morning_weight.toFixed(2), night_count,
                                    night_weight.toFixed(2), TP, TW
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


        while (true) {
            putData(endDate);
            if (startDate.getTime() === endDate.getTime()) break;
            endDate.setDate(endDate.getDate() - 1);
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
                Daily Report
            </h1>

            <div className={style.rangeContainer}>
                <input type="date" ref={dateStartRef} /> {/*less*/}
                to
                <input type="date" ref={dateEndRef} />
                <button onClick={generateReport} disabled={!btnStatus}>
                    {btnStatus ? 'Generate' : 'Please Wait ...'}
                </button>
                <button onClick={() => {
                    window.print();
                }}>
                    Print
                </button>
                <ReactHTMLTableToExcel
                    id="xls-download-btn"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename={`daily_report_${new Date().toLocaleDateString()}`}
                    sheet="tablexls"
                    buttonText={<FaFileDownload />} />
            </div>

            <div className={style.reportTable}>
                <table id="table-to-xls">
                    <thead>
                        <tr>
                            <th rowSpan="2">Date</th>
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
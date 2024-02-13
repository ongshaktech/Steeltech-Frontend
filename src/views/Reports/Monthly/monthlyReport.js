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


export default function MonthlyReport() {

    const collection_name = 'machinesIndividual';
    let tableRef = useRef(null);
    let year = useRef(null);
    let startMonth = useRef(null);
    let endMonth = useRef(null);
    const currentYear = parseInt(new Date().getFullYear());

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



    function generateReport() {
        let date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setDate(1);
        date.setMonth(parseInt(startMonth.current.value));
        date.setFullYear(parseInt(year.current.value));

        let dataNum = 0;

        if (endMonth.current.value === '' || startMonth.current.value === '') {
            setTableStatus('Month Range cannot be empty!');
            return null;
        } else if (endMonth.current.value < startMonth.current.value) {
            setTableStatus('Start month should be less than end month!');
            return null;
        }

        setTableStatus('Please Be Patient ...');
        setBtnStatus(false);

        const putData = (dateInfo) => {
            let startDate = new Date(dateInfo);
            let endDate = new Date(year.current.value, startDate.getMonth() + 1, 0);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);

            // console.log(startDate, endDate);

            const ref = collection(db_firestore, collection_name);

            Array.from(MachineNoList).map((machine_no, index_m) => {
                ProductTypes.map((value, index_p) => {

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
                                if (parseFloat(data['weight']) > 0) {
                                    TW += parseFloat(data['weight']);
                                    TP += parseInt(data['count']);
                                }
                            });

                            if (doc_length !== 0)
                                appendTableRow(
                                    startDate.toLocaleString('default', { month: 'long' }),
                                    machine_no, value, TP, parseFloat(TW).toFixed(2));

                            if (((index_m + 1) * (index_p + 1)) === (MachineNoList.size * ProductTypes.length)) {
                                if (dataNum === 0) setTableStatus('No Data Available in this Date Range');
                                setBtnStatus(true);
                            }
                        }
                    );


                });
            });
        }

        while ((date.getMonth() <= endMonth.current.value)) {
            putData(date);
            date.setMonth(date.getMonth() + 1);
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




    const appendTableRow = (date, machine_no, product_type, tp, tw) => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            `<tr>
        <td>${date}</td>
        <td>${machine_no}</td>
        <td>${product_type}</td>
        <td>${tp}</td>
        <td>${tw}</td>
        </tr>`;
        document.getElementById('reportStatus').style.display = 'none';
        tableRef.current.appendChild(tr);
    }


    return (
        <DashboardContent>
            <h1 className={style.heading}>
                Monthly Report
            </h1>

            <div className={style.rangeContainer}>
                <select ref={year}>
                    <option value={currentYear}>{currentYear}</option>
                    <option value={currentYear - 1}>{currentYear - 1}</option>
                    <option value={currentYear - 2}>{currentYear - 2}</option>
                    <option value={currentYear - 3}>{currentYear - 3}</option>
                    <option value={currentYear - 4}>{currentYear - 4}</option>
                </select>

                <select ref={startMonth}>
                    <option selected disabled value=''>From</option>
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

                <select ref={endMonth}>
                    <option selected disabled value=''>To</option>
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
                    filename={`monthly_report_${new Date().toLocaleDateString()}`}
                    sheet="tablexls"
                    buttonText={<FaFileDownload />} />
            </div>

            <div className={style.reportTable}>
                <table id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Machine No.</th>
                            <th>Product Type</th>
                            <th>Total Product</th>
                            <th>Total Weight</th>
                        </tr>
                    </thead>

                    <tbody ref={tableRef}>
                        <tr>
                            <td className={style.reportStatus} colSpan="9">
                                Plase Select a Month Range
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </DashboardContent>
    );
}
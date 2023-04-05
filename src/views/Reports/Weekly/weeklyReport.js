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



export default function WeeklyReport() {

    const collection_name = 'machinesIndividual';
    let weekRange = useRef(null);
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


    const generateReport = () => {
        let dataNum = 0;
        let endDate = new Date(dateEndRef.current.value);
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setMilliseconds(0);
        endDate.setSeconds(0);

        let range = parseInt(weekRange.current.value);

        if (weekRange.current.value === "" || weekRange.current.value <= 0) {
            setTableStatus('Week Range cannot be empty');
            return null;
        }
        else if (dateEndRef.current.value === "") {
            setTableStatus('Date is Empty!');
            return null;
        }

        setTableStatus('Please be Patient ...');
        setBtnStatus(false);

        async function putData(dateInfo, is_last = false) {
            let startDate = new Date(dateInfo);
            startDate.setHours(23);
            startDate.setMinutes(59);
            startDate.setSeconds(59);

            let endDate = new Date(dateInfo);
            endDate.setDate(endDate.getDate() - 6);
            endDate.setHours(0);
            endDate.setMinutes(0);
            endDate.setSeconds(0);

            console.log(startDate, endDate);

            const ref = collection(db_firestore, collection_name);


            Array.from(MachineNoList).map((machine_no, index_m) => {
                ProductTypes.map((value, index_p) => {
                    let TP = 0;
                    let TW = 0;
                    let doc_length = 0;
                    const q = query(ref,
                        where('unix_time', '>=', Math.floor(endDate.getTime() / 1000)),
                        where('unix_time', '<=', Math.floor(startDate.getTime() / 1000)),
                        where('machine_no', '==', machine_no),
                        where('product_type', '==', value)
                    );

                    getDocs(q).then((snapShot) => {
                        snapShot.forEach((doc) => {
                            doc_length++;
                            dataNum++;
                            const data = doc.data();
                            TW += parseFloat(data['weight']);
                            TP += parseInt(data['count']);
                        });
                        if (doc_length !== 0)
                            appendTableRow(
                                `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()} - 
                                    ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
                                machine_no, value, TP, parseFloat(TW).toFixed(2));

                        if (((index_m + 1) * (index_p + 1)) === (MachineNoList.size * ProductTypes.length)) {
                            if (dataNum === 0) setTableStatus('No Data Available in this Date Range');
                            setBtnStatus(true);
                        }
                    });
                });
            });
        }


        for (let i = 0; i < range; i++) {
            putData(endDate, (i + 1) === range);
            endDate.setDate(endDate.getDate() - 7);
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
                Weekly Report
            </h1>

            <div className={style.rangeContainer}>
                <input type="number" ref={weekRange} placeholder="Weeks" style={{ width: '10.5rem' }} />
                From
                <input type="date" ref={dateEndRef} /> {/*less*/}

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
                    filename={`weekly_report_${new Date().toLocaleDateString()}`}
                    sheet="tablexls"
                    buttonText={<FaFileDownload/>} />
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
                                Plase Select a Week Range
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </DashboardContent>
    );
}
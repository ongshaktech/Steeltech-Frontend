import { useEffect } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { ProductTypes } from "../../../shared/constants";
import style from '../style.module.css';

export default function DailyReport() {

    const collection_name = 'machines';
    let dateStartRef = useRef(null);
    let dateEndRef = useRef(null);
    let tableRef = useRef(null);
    let MachineNo = new Set([]);


    useEffect(() => {
        dateEndRef.current.valueAsDate = new Date();

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

            console.log(MachineNo);
        });
    }, []);


    const generateReport = () => {
        let startDate = new Date(dateStartRef.current.value);
        let endDate = new Date(dateEndRef.current.value);
        tableRef.current.innerHTML =
            `<tr>
                <td class='${style.reportStatus}' id='reportStatus' colSpan="9">
                    Plase Be Patient ...
                </td>
            </tr>`;
        while (true) {            
            if (startDate.getTime() === endDate.getTime()) break;
            putData(endDate);
            endDate.setDate(endDate.getDate() - 1);
        }
    }


    const putData = (dateInfo) => {
        let startDate = new Date(dateInfo);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateInfo);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        const ref = collection(db_firestore, collection_name);

        MachineNo.forEach(machine_no => {
            ProductTypes.map((value) => {
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
                                startDate.toISOString().split('T')[0], machine_no,
                                value, morning_count, morning_weight, night_count, night_weight,
                                TP, TW
                            );
                    }
                );
            });
        });
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
                <button onClick={generateReport}>
                    Generate
                </button>
                <button>
                    Print
                </button>
            </div>

            <div className={style.reportTable}>
                <table>
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
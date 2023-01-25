import { useEffect } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { ProductTypes } from "../../../shared/constants";
import style from '../style.module.css';

export default function WeeklyReport() {

    const collection_name = 'machines';
    let weekRange = useRef(null);
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
        let endDate = new Date(dateEndRef.current.value);
        tableRef.current.innerHTML =
            `<tr>
                <td class='${style.reportStatus}' id='reportStatus' colSpan="9">
                    Plase Be Patient ...
                </td>
            </tr>`;

        for (let i = 0; i < weekRange.current.value; i++) {
            putData(endDate);
            endDate.setDate(endDate.getDate() - 7);
        }
    }


    const putData = (dateInfo) => {
        let startDate = new Date(dateInfo);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateInfo);
        endDate.setDate(endDate.getDate() - 7);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);

        const ref = collection(db_firestore, collection_name);

        MachineNo.forEach(machine_no => {
            ProductTypes.map((value) => {

                let TP = 0;
                let TW = 0;
                let doc_length = 0;

                const q = query(ref,
                    where('unix_time', '>=', Math.floor(endDate.getTime() / 1000)),
                    where('unix_time', '<=', Math.floor(startDate.getTime() / 1000)),
                    where('machine_no', '==', machine_no),
                    where('product_type', '==', value)
                );

                getDocs(q).then(
                    (snapShot) => {
                        snapShot.forEach((doc) => {
                            doc_length++;
                            const data = doc.data();

                            TW += data['weight'];
                            TP += data['count'];
                        });
                        if (doc_length !== 0)
                            appendTableRow(
                                `${startDate.toISOString().split('T')[0]} - ${endDate.toISOString().split('T')[0]}`,
                                machine_no, value, TP, TW
                            );
                    }
                );
            });
        });
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
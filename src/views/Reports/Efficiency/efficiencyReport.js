import { useEffect, useState } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc, limit, orderBy } from "firebase/firestore";
import { ProductThickness } from "../../../shared/constants";
import style from '../style.module.css';


export default function EfficiencyReport() {

    const collection_name = 'machines';
    let dateStartRef = useRef(null);
    let dateEndRef = useRef(null);
    let tableBodyRef = useRef(null);
    let tableHeaderRef = useRef(null);
    let [MachineNoList, setMachineNoList] = useState(new Set([]));


    useEffect(() => {
        dateEndRef.current.valueAsDate = new Date();
        let procductThicknessDiv = '<th></th>';
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

            ProductThickness.forEach(thickness => {
                procductThicknessDiv += `<th>${thickness}</th>`
            });

            tableHeaderRef.current.innerHTML = `<tr>${procductThicknessDiv}<tr>`;
        });
    }, []);


    const generateReport = () => {
        let startDate = new Date(dateStartRef.current.value);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setMilliseconds(0);
        startDate.setSeconds(0);

        let endDate = new Date(dateEndRef.current.value);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setMilliseconds(99);
        endDate.setSeconds(59);

        tableBodyRef.current.innerHTML =
            `<tr>
                <td class='${style.reportStatus}' id='reportStatus' colSpan="${ProductThickness.length}">
                    Plase Be Patient ...
                </td>
            </tr>`;

        putData(startDate, endDate);
    }


    async function putData(startDate, endDate) {


        const ref = collection(db_firestore, 'machineStatus');
        const MachineRef = collection(db_firestore, collection_name);

        for (const machine_number of MachineNoList) {


            // Getting Time Start and Time End
            let time_start = 0, time_end = 0;
            let q = query(ref, where('time_start', '>=', Math.floor(startDate.getTime() / 1000)),
                where('time_start', '<=', Math.floor(endDate.getTime() / 1000)),
                where('machine_no', '==', `${machine_number}`),
                where('is_running', `==`, true),
                orderBy('time_start', 'asc'),
                limit(1)
            );
            let snap = await getDocs(q);
            snap.forEach(result => {
                time_start = result.data()['time_start']
            });
            q = query(ref, where('time_start', '>=', Math.floor(startDate.getTime() / 1000)),
                where('time_start', '<=', Math.floor(endDate.getTime() / 1000)),
                where('machine_no', '==', `${machine_number}`),
                where('is_running', `==`, true),
                orderBy('time_start', 'desc'),
                limit(1)
            );
            snap = await getDocs(q);
            snap.forEach(result => {
                time_end = result.data()['time_end'];
            });



            // Getting Machines Info
            let count = 0;
            let av_time = [];

            if (time_start !== 0 && time_end !== 0) {
                for (const thickness of ProductThickness) {
                    q = query(MachineRef, where('unix_time', '>=', time_start),
                        where('unix_time', '<=', time_end),
                        where('machine_no', '==', `${machine_number}`),
                        where('thickness', `==`, thickness));
                    snap = await getDocs(q);
                    snap.forEach(result => {
                        count += result.data()['count'];
                    });
                    av_time.push((time_end - time_start) / count);
                }
            }

            appendTableRow(machine_number, av_time);
        }
    }


    const appendTableRow = (machine_no, avTimes) => {
        let times = avTimes.map(avTime => `<td>${avTime}</td>`);

        const tr = document.createElement('tr');
        tr.innerHTML =
            `<tr>
        <td><b>Machine ${machine_no}</b></td>
        ${times}
        </tr>`;
        document.getElementById('reportStatus').style.display = 'none';
        tableBodyRef.current.appendChild(tr);
    }


    return (
        <DashboardContent>
            <h1 className={style.heading}>
                Machine Efficiency
            </h1>

            <div className={style.rangeContainer}>
                <input type="date" ref={dateStartRef} /> {/*less*/}
                to
                <input type="date" ref={dateEndRef} />
                <button onClick={generateReport}>
                    Generate
                </button>
                <button onClick={() => {
                    window.print();
                }}>
                    Print
                </button>
            </div>

            <div className={style.reportTable}>
                <table>
                    <thead ref={tableHeaderRef}>
                        {/* Machine NO */}
                    </thead>

                    <tbody ref={tableBodyRef}>
                        <tr>
                            <td className={style.reportStatus} colSpan={ProductThickness.length + 1}>
                                Plase Select a Date Range
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </DashboardContent>
    );
}
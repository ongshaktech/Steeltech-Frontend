import { useEffect, useState } from "react";
import { useRef } from "react";
import { DashboardContent } from "../../../styles/Dashboard.styled";
import { db_firestore } from "../../../Hooks/config";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { ProductThickness } from "../../../shared/constants";
import style from '../style.module.css';


export default function EfficiencyReport() {

    const collection_name = 'machines';
    let dateStartRef = useRef(null);
    let dateEndRef = useRef(null);
    let tableBodyRef = useRef(null);
    let tableHeaderRef = useRef(null);
    let [MachineNoList, setMachineNoList] = useState(new Set([]));
    let [btnStatus, setBtnStatus] = useState(true);

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

        if (dateEndRef.current.value === '' || dateStartRef.current.value === '') {
            setTableStatus('Date Ranges cannot be empty!');
            return null;
        } else if (startDate.getTime() > endDate.getTime()) {
            setTableStatus('Start date should be less than end date');
            return null;
        }

        setTableStatus('Please be Patient ...');

        setBtnStatus(false);
        putData(startDate, endDate);
    }

    const setTableStatus = (prompt) => {
        tableBodyRef.current.innerHTML =
            `<tr>
            <td class='${style.reportStatus}' id='reportStatus' colSpan=${ProductThickness.length + 1}>
                ${prompt}
            </td>
        </tr>`;
    }

    async function putData(startDate, endDate) {

        const ref = collection(db_firestore, 'machineStatus');
        const MachineRef = collection(db_firestore, collection_name);

        Array.from(MachineNoList).forEach((machine_number, index) => {
            // Getting Time Start and Time End
            let total_time = 0;

            let q = query(ref, where('time_start', '>=', Math.floor(startDate.getTime() / 1000)),
                where('time_start', '<=', Math.floor(endDate.getTime() / 1000)),
                where('machine_no', '==', `${machine_number}`),
                where('is_running', `==`, true)
            );

            getDocs(q).then((snap) => {

                snap.forEach(result => {
                    total_time += (result.data()['time_end'] - result.data()['time_start']);
                });

                let av_time = [];
                for (const thickness of ProductThickness) {
                    let count = 0;
                    q = query(MachineRef, where('unix_time', '>=', Math.floor(startDate.getTime() / 1000)),
                        where('unix_time', '<=', Math.floor(endDate.getTime() / 1000)),
                        where('machine_no', '==', `${machine_number}`),
                        where('thickness', `==`, thickness));

                    getDocs(q).then((snap) => {
                        snap.forEach(result => {
                            count += result.data()['count'];
                        });
                        count !== 0 ?
                            av_time.push(`${(total_time / count).toFixed(2)} sec`) :
                            av_time.push('N/A');

                        if (av_time.length === ProductThickness.length) {
                            appendTableRow(machine_number, av_time);
                        }
                        if ((index + 1) === MachineNoList.size && av_time.length === ProductThickness.length) {
                            setBtnStatus(true);
                        }
                        console.log(MachineNoList.size, index);
                        console.log(av_time.length, ProductThickness.length);
                    });
                }
            });
        });
    }



    const appendTableRow = (machine_no, avTimes) => {
        let times = avTimes.map(avTime => `<td>${avTime}</td>`);
        times = times.join("");

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

            <div className={style.rangeContainer} style={{ width: '53rem' }}>
                <input type="date" ref={dateStartRef} /> {/*less*/}
                to
                <input type="date" ref={dateEndRef} />
                <button onClick={generateReport} disabled={!true}>
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
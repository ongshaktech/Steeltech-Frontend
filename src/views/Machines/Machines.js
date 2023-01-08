import { DashboardContent } from "../../styles/Dashboard.styled";
import Card from "./components/Card";
import { MachineNo } from "../../shared/constants";
import styles from './Machines.module.css';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db_firestore } from "../../Hooks/config";
import { useEffect, useState } from "react";

export default function Machines() {

    let [machineInfo, setMachineInfo] = useState([]);

    useEffect(
        () => {
            const ref = collection(db_firestore, `machineStatus`);
            const q = query(ref);

            onSnapshot(q,
                (snapShot) => {
                    let items = [];
                    snapShot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setMachineInfo(items);
                }
            );


        }, []
    );

    return (
        <DashboardContent>
            <div>
                <h1 className={styles.heading}>
                    Forming Machine
                </h1>
            </div>

            <div>
                <h1 className={styles.heading}>
                    Vending Machine
                </h1>
            </div>



            {machineInfo.map((info) =>
                <Card machineNo={info.machine_no} active={info.is_running} />
            )}
        </DashboardContent>
    );
}
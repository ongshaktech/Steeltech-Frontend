import { DashboardContent } from "../../styles/Dashboard.styled";
import Card from "./components/Card";
import styles from './Machines.module.css';
import { collection, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db_firestore } from "../../Hooks/config";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";


export default function Machines() {

    let [dataLoaded, setDataLoaded] = useState(false);
    let [dataAvailable, setDataAvailable] = useState(false);
    let [polishMachine, setPolishMachine] = useState(<></>);
    let [formingMachine, setFormingMachine] = useState(<></>);


    async function GetMachineIndexs() {
        const ref = doc(db_firestore, `information`, 'info');
        const querySnapshot = await getDoc(ref);
        return querySnapshot.data();
    }

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }


    useEffect(
        () => {
            GetMachineIndexs().then(data => {
                const ref = collection(db_firestore, `machineLatestStatus`);
                // const q = query(ref);

                onSnapshot(ref,
                    (snapShot) => {

                        let forming_machine = [];
                        let polish_machine = [];

                        snapShot.forEach((doc) => {
                            let MachineData = doc.data();

                            if (isInArray(MachineData.machine_no, data.forming_machine)) {
                                forming_machine.push(
                                    <Card machineNo={MachineData.machine_no} active={MachineData.is_running} />
                                );
                            }
                            else if (isInArray(MachineData.machine_no, data.polish_machine)) {
                                polish_machine.push(
                                    <Card machineNo={MachineData.machine_no} active={MachineData.is_running} />
                                );
                            }
                        });

                        setFormingMachine(forming_machine);
                        setPolishMachine(polish_machine);
                        setDataLoaded(true);
                        setDataAvailable(forming_machine.length !== 0 || polish_machine.length !== 0);
                    }
                );
            });
        }, []
    );


    return (
        <DashboardContent>
            {
                dataLoaded ?
                    (
                        dataAvailable ?
                        <>
                            <div>
                                <h1 className={styles.heading}>
                                    Forming Machine
                                </h1>
                                {formingMachine}
                            </div>

                            <div>
                                <h1 className={styles.heading}>
                                    Polish Machine
                                </h1>
                                {polishMachine}
                            </div>
                        </>:
                        <h1 className={styles.heading}>
                            Data Not Available
                        </h1>
                    )
                    :
                    <div className="loadingSpinner">
                        <Triangle
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="triangle-loading"
                            visible={true} />
                    </div>
            }
        </DashboardContent>
    );
}
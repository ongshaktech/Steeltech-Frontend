import { DashboardContent } from "../../styles/Dashboard.styled";
import Card from "./components/Card";
import styles from './Machines.module.css';
import { collection, getDoc, doc, orderBy, limit, where, query, getDocs } from 'firebase/firestore';
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

    // function isInArray(value, array) {
    //     return array.indexOf(value) > -1;
    // }


    useEffect(
        () => {
            const threshold_sec = 10 * 60;

            GetMachineIndexs().then(data => {
                const ref = collection(db_firestore, `machineStatus`);

                let forming_machine = [];
                let polish_machine = [];

                // forming machines
                data?.forming_machine.forEach(number => {
                    const q = query(ref, where('machine_no', '==', number), orderBy('time_end', 'desc'), limit(1));

                    // check a machine is active or not
                    getDocs(q).then(
                        docs => {
                            docs.forEach(
                                doc => {
                                    let data = doc.data();

                                    if ((Math.floor(new Date().getTime() / 1000) - data?.time_end) <= threshold_sec) {
                                        forming_machine.push(
                                            <Card meta="forming" machineNo={`${number}`} active={true} />
                                        );
                                    }
                                    else {
                                        forming_machine.push(
                                            <Card meta="forming" machineNo={`${number}`} active={false} />
                                        );
                                    }
                                }
                            );
                            setFormingMachine(forming_machine);
                            setDataLoaded(true);
                            setDataAvailable(forming_machine.length !== 0 || polish_machine.length !== 0);
                        }
                    );
                });



                // polish machine
                data?.polish_machine.forEach(number => {
                    const q = query(ref, where('machine_no', '==', number), orderBy('time_end', 'desc'), limit(1));

                    // check a machine is active or not
                    getDocs(q).then(
                        docs => {

                            docs.forEach(
                                doc => {
                                    let data = doc.data();
                                    if ((Math.floor(new Date().getTime() / 1000) - data?.time_end) <= threshold_sec) {
                                        polish_machine.push(
                                            <Card meta="polish" machineNo={`${number}`} active={true} />
                                        );
                                    }
                                    else {
                                        polish_machine.push(
                                            <Card meta="polish" machineNo={`${number}`} active={false} />
                                        );
                                    }
                                }
                            );
                            setPolishMachine(polish_machine);
                            setDataLoaded(true);
                            setDataAvailable(forming_machine.length !== 0 || polish_machine.length !== 0);
                        }
                    );
                });





                // setDataAvailable(forming_machine.length !== 0 || polish_machine.length !== 0);


                //     onSnapshot(ref,
                //         (snapShot) => {

                //             let forming_machine = [];
                //             let polish_machine = [];

                //             snapShot.forEach((doc) => {
                //                 let MachineData = doc.data();

                //                 if (isInArray(MachineData.machine_no, data.forming_machine)) {
                //                     forming_machine.push(
                //                         <Card meta="forming" machineNo={MachineData.machine_no} active={MachineData.is_running}/>
                //                     );
                //                 }
                //                 else if (isInArray(MachineData.machine_no, data.polish_machine)) {
                //                     polish_machine.push(
                //                         <Card meta="polish" machineNo={MachineData.machine_no} active={MachineData.is_running}/>
                //                     );
                //                 }
                //             });

                //             setFormingMachine(forming_machine);
                //             setPolishMachine(polish_machine);
                //             setDataLoaded(true);
                //             setDataAvailable(forming_machine.length !== 0 || polish_machine.length !== 0);
                //         }
                //     );
                // });

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
                            </> :
                            <h1 className={styles.heading}>
                                Please Wait
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
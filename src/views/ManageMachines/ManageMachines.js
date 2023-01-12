import { DashboardContent } from "../../styles/Dashboard.styled";
import style from './styles.module.css';
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import Modal from "../../organism/Modal";
import AddMachineForm from "./AddMachineForm";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db_firestore } from "../../Hooks/config";


function AddBtn({ setShowModal }) {
    return (
        <div className={`${style.listElements} ${style.AddElement}`}
            onClick={() => { setShowModal(true) }}>
            <span>
                <CgAddR></CgAddR>
            </span>
        </div>
    );
}

export default function ManageMachines() {

    let [showFormingModal, setShowFormingModal] = useState(false);
    let [showPolishModal, setShowPolishModal] = useState(false);

    let [formingMachineData, setFormingMachineData] = useState({});
    let [polishMachineData, setPolishMachineData] = useState({});

    let [formingMachines, setFormingMachines] = useState([]);
    let [polishMachines, setPolishMachines] = useState([]);

    


    //  *********************************** Update Data **********************************
    useEffect(() => {
        const ref = doc(db_firestore, `information`, 'info');

        if (!(Object.keys(formingMachineData).length === 0 && formingMachineData.constructor === Object)) {
            updateDoc(ref, {
                forming_machine: arrayUnion(formingMachineData['machine_no'].toString())
            });
        }
    }, [formingMachineData]);

    useEffect(() => {
        const ref = doc(db_firestore, `information`, 'info');

        if (!(Object.keys(polishMachineData).length === 0 && polishMachineData.constructor === Object)) {
            updateDoc(ref, {
                polish_machine: arrayUnion(polishMachineData['machine_no'].toString())
            });
        }
    }, [polishMachineData]);


    // **************************** Fetch and insert data to div **************************
    useEffect(() => {
        const ref = doc(db_firestore, `information`, 'info');

        // getDoc(ref).then(
        onSnapshot(ref,
            data => {
                const machines = data.data();
                let forming_machines = [];
                let polish_machines = [];

                machines['forming_machine'].forEach((num, index) => {
                    forming_machines.push(
                        <div className={style.listElements} key={index}>
                            <span>{num}</span>
                        </div>
                    );
                });

                machines['polish_machine'].forEach((num, index) => {
                    polish_machines.push(
                        <div className={style.listElements} key={index}>
                            <span>{num}</span>
                        </div>
                    );
                });

                setFormingMachines(forming_machines);
                setPolishMachines(polish_machines);
            }
        )
    }, []);



    return (
        <DashboardContent>
            {
                showFormingModal &&
                <Modal>
                    <div onClick={() => { setShowFormingModal(false) }} className='button'>X</div>
                    <AddMachineForm setMachineData={setFormingMachineData} text="Forming Machine"
                        setShowModal={setShowFormingModal} />
                </Modal>
            }
            {
                showPolishModal &&
                <Modal>
                    <div onClick={() => { setShowPolishModal(false) }} className='button'>X</div>
                    <AddMachineForm setMachineData={setPolishMachineData} text="Polish Machine"
                        setShowModal={setShowPolishModal} />
                </Modal>
            }

            <header className={style.header}>
                Manage Machines
            </header>


            <div className={style.listDiv}>
                <header>
                    Forming Machine
                </header>
                {formingMachines}
                <AddBtn setShowModal={setShowFormingModal} />
            </div>



            <div className={style.listDiv}>
                <header>
                    Polish Machine
                </header>
                {polishMachines}
                <AddBtn setShowModal={setShowPolishModal} />
            </div>

        </DashboardContent>
    );
}
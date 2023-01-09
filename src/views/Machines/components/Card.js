import styles from './style.module.css';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export default function Card(props) {
    return (
        <NavLink to={`/machines/${props.machineNo}`}>
            <div className={styles.card} style={props.active ? { backgroundColor: '#6bffa9' } : { backgroundColor: 'rgb(255, 112, 102)' }}>
                <div className={styles.cardIcon}>
                    <BsFillGrid3X3GapFill />
                </div>
                <h2>
                    Machine {props.machineNo}
                </h2>
                <h3>
                    {props.active ? "(Active)": "(Idle)"}
                </h3>
            </div>
        </NavLink>
    );
}
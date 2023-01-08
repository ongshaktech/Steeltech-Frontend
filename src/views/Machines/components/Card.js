import styles from './style.module.css';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

export default function Card(props) {
    return (
        <div className={styles.card} style={props.active ? { backgroundColor: '#6bffa9' } : { backgroundColor: 'white' }}>
            <div className={styles.cardIcon}>
                <BsFillGrid3X3GapFill />
            </div>
            <h2>
                Machine {props.machineNo}
            </h2>
        </div>
    );
}
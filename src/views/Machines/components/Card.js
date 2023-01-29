import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import forming from './../../../assets/images/forming.png';
import polish from './../../../assets/images/polisher.png';

export default function Card(props) {
    return (
        <NavLink to={`/machines/${props.machineNo}`}>
            <div className={styles.card} style={props.active ? { backgroundColor: '#6bffa9' } : { backgroundColor: 'rgb(255, 112, 102)' }}>
                <div className={styles.cardIcon}>
                    {
                        props.meta === 'forming' ?
                            <img src={forming} alt="Forming Machine" /> :
                            <img src={polish} alt="Polish Machine" />
                    }
                </div>
                <h2>
                    Machine {props.machineNo}
                </h2>
                <h3>
                    {props.active ? "(Active)" : "(Idle)"}
                </h3>
            </div>
        </NavLink>
    );
}
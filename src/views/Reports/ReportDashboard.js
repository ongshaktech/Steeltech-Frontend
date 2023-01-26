import style from './style.module.css';
import { NavLink } from "react-router-dom";

import dailyImg from '../../assets/images/daily.png';
import weeklyImg from '../../assets/images/weekly.png';
import quarterlyImg from '../../assets/images/quarterly.png';
import monthlyImg from '../../assets/images/monthly.png';
import yearlyImg from '../../assets/images/yearly.png';
import realtimeImg from '../../assets/images/realtime.png';



function Cards(props) {
    return (
        <NavLink to={props.reportLink}>
            <div className={style.card}>
                <img src={props.img} alt="Couldn't load" />
                <h2>
                    {props.text}
                </h2>
            </div>
        </NavLink>
    );
}


export default function ReportDashboard() {
    return (
        <div className={style.container}>
            <h1 className={style.heading}>
                Reports
            </h1>
            <Cards reportLink='/realtime-report' text="Realtime Report" img={realtimeImg} />
            <Cards reportLink='/daily-report' text="Daily Report" img={dailyImg} />
            <Cards reportLink='/weekly-report' text="Weekly Report" img={weeklyImg} />
            <Cards reportLink='/monthly-report' text="Monthly Report" img={monthlyImg} />
            <Cards reportLink='/quarterly-report' text="Quarterly Report" img={quarterlyImg} />
            <Cards reportLink='/yearly-report' text="Yearly Report" img={yearlyImg} />
        </div>
    );
}
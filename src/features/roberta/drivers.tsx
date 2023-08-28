import React from 'react'
import { useAppDispatch, useAppSelector } from '../../context';
import { selectRobertaDrivers } from './robertaSlice';
import { startDriving, stopDriving } from '../hub/hubSlice';
import Authorize from '../appUser/authorize';

const Drivers = () => {
    const drivers = useAppSelector(selectRobertaDrivers);
    const dispatch = useAppDispatch();

    const changeDriverStatus = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        const name = target.name;

        if (name === "stop") {
            dispatch(stopDriving());
        }
        else {
            dispatch(startDriving(name));
        }
    }

    return (
        <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th>Driver</th>
                    <th>Status</th>
                    <Authorize requireAdmin={true}>
                        <th className="text-right">
                            <button onClick={(event) => { changeDriverStatus(event); }} name="stop" type="button" className="btn btn-outline-danger btn-sm">All Stop</button>
                        </th>
                    </Authorize>
                </tr>
            </thead>
            <tbody id="driverBody">
                {drivers.map(driver => (
                    <tr key={driver.connectionId}>
                        <td>{driver.screenName}</td>
                        <td>{driver.driverStatusType.code}</td>
                        <Authorize requireAdmin={true}>
                            <td className="text-right">
                                <button
                                    onClick={(event) => { changeDriverStatus(event); }}
                                    name={(driver.driverStatusType.code === "Driving") ? "stop" : driver.connectionId} type="button" className={`btn btn-sm ${(driver.driverStatusType.code === "Driving") ? "btn-outline-danger" : "btn-outline-success"}`}>
                                    {(driver.driverStatusType.code === "Driving") ? "Stop" : "Start"}
                                </button>
                            </td>
                        </Authorize>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Drivers

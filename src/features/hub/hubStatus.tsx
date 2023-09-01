import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../context';
import { selectConnectionStatus } from './hubSlice';

const HubStatus = () => {
    const [classes, setClasses] = useState('alert');
    const connectionStatus = useAppSelector(selectConnectionStatus);

    useEffect(() => {
        let newVal = 'alert ';
        switch (connectionStatus) {
            case 'Disconnected':
                newVal += 'alert-danger';
                break;
            case 'Connecting':
                newVal += 'alert-warning';
                break;
            case 'Connected':
                newVal += 'alert-success';
                break;
            default:
                console.error(`Unknown state: ${connectionStatus}`);
                break;
        };
        setClasses(newVal);
    }, [connectionStatus]);

    return (
        <span className={classes} title={`Roberta Connection State: ${connectionStatus}`}>{connectionStatus}</span>
    )
}

export default HubStatus
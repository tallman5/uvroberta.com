import GaugeChart from '@tallman/strong-strap/dist/components/gaugeChart'
import React from 'react'
import { useAppSelector } from '../../context';
import { selectRoberta } from './robertaSlice';

const Gauges = () => {
    const robertaState = useAppSelector(selectRoberta);

    const size = 75
    const baseOptions = { width: size, height: size, is3D: true, minorTicks: 5 }
    const speedOptions = { ...baseOptions, min: 0, max: 5, greenFrom: 0, greenTo: 3, yellowFrom: 3, yellowTo: 4, redFrom: 4, redTo: 5 }
    const voltOptions = { ...baseOptions, min: 0, max: 40, redFrom: 0, redTo: 15, yellowFrom: 15, yellowTo: 20, greenFrom: 20, greenTo: 40 }
    const ampOptions = { ...baseOptions, min: -10, max: 10 }
    const powOptions = { ...baseOptions, min: -1000, max: 1000 }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="row">
                        <div className="col">
                            <GaugeChart id="speedGauge" caption="SPEED" value={robertaState?.gpsState?.speed} options={speedOptions} />
                            <GaugeChart id="lPowGauge" caption="L POW" value={robertaState?.roboteqState?.leftMotorState?.power} options={powOptions} />
                            <GaugeChart id="lAmpsGauge" caption="L AMPS" value={robertaState?.roboteqState?.leftMotorState.motorAmps} options={ampOptions} />
                        </div>
                        <div className="col">
                            <GaugeChart id="voltsGauge" caption="VOLTS" value={robertaState?.roboteqState?.batteryState.volts} options={voltOptions} />
                            <GaugeChart id="rPowGauge" caption="R POW" value={robertaState?.roboteqState?.rightMotorState.power} options={powOptions} />
                            <GaugeChart id="rAmpsGauge" caption="R AMPS" value={robertaState?.roboteqState?.rightMotorState.motorAmps} options={ampOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gauges
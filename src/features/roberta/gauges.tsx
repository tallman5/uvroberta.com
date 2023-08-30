import GaugeChart from '@tallman/strong-strap/dist/components/gaugeChart'
import React from 'react'

const Gauges = () => {
    const size = 75
    const speedOptions = { width: size, height: size, min: 0, max: 5, greenFrom: 0, greenTo: 3, yellowFrom: 3, yellowTo: 4, redFrom: 4, redTo: 5, minorTicks: 5 }
    const voltOptions = { width: size, height: size, min: 0, max: 40, redFrom: 0, redTo: 15, yellowFrom: 15, yellowTo: 20, greenFrom: 20, greenTo: 40, minorTicks: 5 }
    const ampOptions = { width: size, height: size, min: -10, max: 10, is3D: true, minorTicks: 5 }
    const powOptions = { width: size, height: size, min: -1000, max: 1000, is3D: true, minorTicks: 5 }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="row">
                        <div className="col">
                            <GaugeChart id="speedGauge" caption="SPEED" value={3} options={speedOptions} />
                            <GaugeChart id="lPowGauge" caption="L POW" value={0} options={powOptions} />
                            <GaugeChart id="lAmpsGauge" caption="L AMPS" value={0} options={ampOptions} />
                        </div>
                        <div className="col">
                            <GaugeChart id="voltsGauge" caption="VOLTS" value={24} options={voltOptions} />
                            <GaugeChart id="rPowGauge" caption="R POW" value={160} options={powOptions} />
                            <GaugeChart id="rAmpsGauge" caption="R AMPS" value={11} options={ampOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gauges
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Drivers from './drivers'
import { useAppDispatch, useAppSelector } from '../../context'
import { cycleDashView, selectRoberta } from './robertaSlice'
import Expander from '../../components/expander'
import AccountDropdown from '../appUser/accountDropdown'
import ToggleFullscreen from '../../components/toggleFullscreen'
import Authorize from '../appUser/authorize'
import Battery from './battery'
import PowerScale from './powerScale'
import Gauges from './gauges'

const StartMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const dispatch = useAppDispatch();
    const robertaState = useAppSelector(selectRoberta);

    const cycleDv = () => {
        dispatch(cycleDashView());
        setMenuVisible(false);
    }

    return (
        <div className="text-nowrap">
            <button onClick={() => { setMenuVisible(!menuVisible) }} type="button" className="btn btn-light btn-sm">
                <div className="d-flex align-items-center">
                    <StaticImage src='../../images/icon.png' alt='Roberta' width={32} />
                    <div style={{ marginLeft: '5px' }}>roberta</div>
                </div>
            </button>
            <Expander isExpanded={menuVisible}>
                <div className="bg-light rounded">
                    <nav className="navbar bg-body-secondary rounded">
                        <ul className="nav">
                            <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li>
                            <li className="nav-item"><Link to="/state" className="nav-link">STATE</Link></li>
                        </ul>
                        <AccountDropdown />
                    </nav>
                    <div className='row p-3'>
                        <div className='col'>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={cycleDv}>Toggle View</button>
                                    &nbsp;&nbsp;
                                    <ToggleFullscreen type="button" className="btn btn-outline-primary btn-sm">Toggle Full Screen</ToggleFullscreen>
                                </div>
                            </div>
                            <hr />
                            <Authorize requireAdmin={true}>
                                <div className='row'>
                                    <div className='col'>
                                        <PowerScale />
                                    </div>
                                </div>
                                <hr />
                            </Authorize>
                            <div className="row">
                                <div className="col">
                                    <Drivers />
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col'>
                                    <center>
                                        <Battery battPercent={robertaState?.roboteqState?.batterState?.percent} isHorizontal={true} />
                                    </center>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <Gauges />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Expander>
        </div>
    )
}

export default StartMenu

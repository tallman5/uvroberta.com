import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Drivers from './drivers'
import { useAppDispatch } from '../../context'
import { cycleDashView } from './robertaSlice'
import Expander from '../../components/expander'
import AccountDropdown from '../appUser/accountDropdown'
import ToggleFullscreen from '../../components/toggleFullscreen'
import Authorize from '../appUser/authorize'

const StartMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const dispatch = useAppDispatch();

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
                <div className="container bg-light rounded">
                    <div className="row mb-3 shadow-sm">
                        <div className="col">
                            <ul className="nav justify-content-end">
                                <li className="nav-item"><Link to="/state" className="nav-link">State</Link></li>
                                <AccountDropdown />
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={cycleDv}>Toggle View</button>
                            &nbsp;&nbsp;
                            <ToggleFullscreen type="button" className="btn btn-outline-primary btn-sm" onClick={() => { setMenuVisible(false); }}>Toggle Full Screen</ToggleFullscreen>
                        </div>
                    </div>
                    <hr />
                    <Authorize requireAdmin={true}>
                        <div className='row'>
                            <div className='col'>
                                <span className="align-middle">Power Scale: 100</span>
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-primary btn-sm" type="button">-</button>
                                &nbsp;
                                <button className="btn btn-primary btn-sm" type="button">+</button>
                                &nbsp;<button className="btn btn-primary btn-sm" type="button">x</button>
                            </div>
                        </div>
                    </Authorize>
                    <div className="row">
                        <div className="col">
                            <Drivers />
                        </div>
                    </div>
                </div>
            </Expander>
        </div>
    )
}

export default StartMenu

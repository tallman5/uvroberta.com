import React, { useEffect, useState } from 'react'
import Authorize from '../features/appUser/authorize'
import Drivers from './drivers'

const Dashboard = () => {

    return (
        <div className='row'>
            <div className='col'>
                <Authorize requireAdmin={true}>
                    <div>
                        <span className="align-middle">Power Scale: 100</span>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary btn-sm" type="button">-</button>
                        &nbsp;
                        <button className="btn btn-primary btn-sm" type="button">+</button>
                        &nbsp;<button className="btn btn-primary btn-sm" type="button">x</button>
                    </div>
                </Authorize>
                <Drivers />
            </div>
        </div>
    )
}

export default Dashboard

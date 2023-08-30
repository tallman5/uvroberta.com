import React from 'react'
import Authorize from '../appUser/authorize'

const PowerScale = () => {
    return (
        <Authorize requireAdmin={true}>
            <span className="align-middle">Power Scale: 100</span>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary btn-sm" type="button">-</button>
            &nbsp;
            <button className="btn btn-primary btn-sm" type="button">+</button>
            &nbsp;<button className="btn btn-primary btn-sm" type="button">x</button>
        </Authorize>
    )
}

export default PowerScale

import React from 'react'
import Authorize from '../appUser/authorize'
import { useAppDispatch, useAppSelector } from '../../context'
import { selectPowerScale } from './robertaSlice'
import { setPowerScale } from '../hub/hubSlice'

const PowerScale = () => {
    const dispatch = useAppDispatch();
    const powerScale = useAppSelector(selectPowerScale);

    return (
        <Authorize requireAdmin={true}>
            <span className="align-middle">Power Scale: {powerScale}</span>
            &nbsp;&nbsp;&nbsp;
            <button onClick={()=>{dispatch(setPowerScale(powerScale-.1));}} className="btn btn-primary btn-sm" type="button">-</button>
            &nbsp;
            <button onClick={()=>{dispatch(setPowerScale(powerScale+.1));}} className="btn btn-primary btn-sm" type="button">+</button>
            &nbsp;<button onClick={()=>{dispatch(setPowerScale(1));}} className="btn btn-primary btn-sm" type="button">x</button>
        </Authorize>
    )
}

export default PowerScale

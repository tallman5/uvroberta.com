import React, { ComponentPropsWithoutRef } from 'react'
import * as Styles from '../styles'

export interface IWebcam extends ComponentPropsWithoutRef<'img'> { }

const Webcam = ({ ...rest }: IWebcam) => {
    return (
        <img style={Styles.Cover} {...rest} />
    )
}

export default Webcam

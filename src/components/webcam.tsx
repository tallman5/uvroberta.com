import React, { useState } from 'react'
import * as Styles from '../styles'
import { StaticImage } from 'gatsby-plugin-image';

export interface WebcamProps {
    src: string
}

const Webcam: React.FC<WebcamProps> = ({ src }) => {
    const [imgReady, setImgReady] = useState(false);

    return (
        <>
            <img src={src} style={Styles.Cover} onLoad={() => setImgReady(true)} />
            <StaticImage src='../images/patience.webp' alt='Waiting' style={{ ...Styles.Cover, display: (imgReady) ? 'none' : 'unset' }} />
        </>
    )
}

export default Webcam

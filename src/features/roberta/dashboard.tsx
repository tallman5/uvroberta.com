import React, { useState } from "react"
import type { PageProps } from "gatsby"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../context"
import * as Styles from '../../styles'
import { selectImDriving, selectRobertaDashView } from "./robertaSlice"
import Thumbstick, { ThumbPosition } from "./thumbstick"
import { ensureHubConnected, setXY } from "../hub/hubSlice"
import AzMap from "../../components/azMap"
import Webcam from "../../components/webcam"
import StartMenu from "./startMenu"

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const [viewStyles, setViewStyles] = useState([Styles.DashBack, Styles.DashFrontBottom, Styles.DashFrontTop]);
    const dv = useAppSelector(state => selectRobertaDashView(state));
    const imDriving = useAppSelector(selectImDriving);

    const handleXyChange = (tp: ThumbPosition) => {
        if (!imDriving) return;
        dispatch(setXY(tp.x, tp.y));
    };

    useEffect(() => {
        dispatch(ensureHubConnected());
    }, []);

    useEffect(() => {
        switch (dv) {
            case 0:
                setViewStyles([Styles.DashBack, Styles.DashFrontBottom, Styles.DashFrontTop]);
                break;
            case 1:
                setViewStyles([Styles.DashFrontBottom, Styles.DashFrontTop, Styles.DashBack]);
                break;
            case 2:
                setViewStyles([Styles.DashFrontTop, Styles.DashBack, Styles.DashFrontBottom]);
                break;
            default:
                console.error('Invalid DV');
                break;
        }
    }, [dv]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>

            <AzMap style={viewStyles[0]} />

            <div id="dashCam" style={viewStyles[1]}>
                <Webcam src={process.env.GATSBY_WEBCAM_URL || ''} />
            </div>

            <div id="groundCam" style={viewStyles[2]}>
                <Webcam src={process.env.GATSBY_GROUNDCAM_URL || ''} />
            </div>

            <div style={{ position: "absolute", top: '0', left: '0', zIndex: "500" }}>
                <StartMenu />
            </div>

            {
                (imDriving)
                    ? <div style={{ position: "absolute", bottom: "0", right: "0", zIndex: '1000' }}>
                        <Thumbstick onXyChange={handleXyChange} />
                    </div>
                    : null
            }

        </div>
    )
}

export default Dashboard

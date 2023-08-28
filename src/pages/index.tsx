import React, { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../context"
import { ensureHubConnected, setXY } from "../features/hub/hubSlice"
import * as Styles from "../styles"
import AzMap from "../components/azMap"
import Webcam from "../components/webcam"
import Layout from "../components/layout"
import { selectImDriving, selectRobertaDashView } from "../features/roberta/robertaSlice"
import StartMenu from "../features/roberta/startMenu"
import Thumbstick, { ThumbPosition } from "../features/roberta/thumbstick"

const IndexPage: React.FC<PageProps> = () => {
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
    <Layout hideHeader={true}>
      <div style={{ width: '100vw', height: '100vh' }}>

        <AzMap style={viewStyles[0]} />

        <div id="dashCam" style={viewStyles[1]}>
          <Webcam src={process.env.GATSBY_WEBCAM_URL || ''} showObjects={true} />
        </div>

        <div id="groundCam" style={viewStyles[2]}>
          <Webcam src={process.env.GATSBY_WEBCAM_URL || ''} />
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
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home | uvroberta.com</title>

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import AzMap from "../components/azMap"
import { useEffect, useState } from "react"
import * as Styles from "../styles"
import Webcam from "../components/webcam"
import { useAppDispatch } from "../context"
import { connectToHub } from "../features/hub/hubSlice"

const IndexPage: React.FC<PageProps> = () => {
  const [isMapFocused, setIsMapFocused] = useState(true);
  const webcamSrc = process.env.GATSBY_WEBCAM_URL
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connectToHub());
  }, [])

  return (
    <Layout padTop={false}>

      <div style={(isMapFocused) ? Styles.DashBack : Styles.DashFront}>
        <AzMap />
      </div>

      <div id="dashCam" style={(isMapFocused) ? Styles.DashFront : Styles.DashBack} title="Click to toggle view" onClick={() => { setIsMapFocused(!isMapFocused) }}>
        <Webcam src={webcamSrc} />
      </div>

    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home | uvroberta.com</title>

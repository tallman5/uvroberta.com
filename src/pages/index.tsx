import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import AzMap from "../components/azMap"
import { useState } from "react"
import * as Styles from "../styles"

const IndexPage: React.FC<PageProps> = () => {
  const [backView] = useState("map");

  return (
    <Layout padTop={false}>

      <div style={(backView == "map") ? Styles.DashBack : Styles.DashFront}>
        <AzMap />
      </div>

    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home | uvroberta.com</title>

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="container">
        <h1>uvroberta.com</h1>
        <h2>About</h2>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

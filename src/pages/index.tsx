import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>uvroberta.com</h1>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col" style={{height: '1000px'}}>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home | uvroberta.com</title>

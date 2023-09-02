import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div>
        <StaticImage src="../images/roberta-lawn.webp" alt="Roberta" aspectRatio={3 / 1} />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>uvroberta.com</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home | uvroberta.com</title>

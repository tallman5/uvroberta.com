import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../../components/layout"

const ScratchIndex: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="container">
                <h1>Scratch</h1>
            </div>
        </Layout>
    )
}

export default ScratchIndex

export const Head: HeadFC = () => <title>Scratch | uvroberta.com</title>

import React from "react";
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../../components/layout"
import Webcam from "../../components/webcam";

const ScratchIndex: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <Webcam src={'https://rofo.mcgurkin.net:5101/stream'} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ScratchIndex

export const Head: HeadFC = () => <title>Scratch | uvroberta.com</title>

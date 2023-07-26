import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../../components/layout"
import { executeFetchAsync } from "@tallman/strong-strap";

const ScratchIndex: React.FC<PageProps> = () => {
    return (
        <Layout padTop={true}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Scratch</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            Msg:
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ScratchIndex

export const Head: HeadFC = () => <title>Scratch | uvroberta.com</title>

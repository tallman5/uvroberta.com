import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Dashboard from "../../features/roberta/dashboard";

const PilotPage: React.FC<PageProps> = () => {
    return (
        <Dashboard />
    )
}

export default PilotPage

export const Head: HeadFC = () => <title>Pilot | uvroberta.com</title>

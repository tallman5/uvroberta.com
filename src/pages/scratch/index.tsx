import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../../components/layout"
import { addMessage, connectToHub, Message } from "../../features/app/appSlice"
import { useAppDispatch } from "../../context"
import { UiFunction } from "@tallman/strong-strap/dist/utilities"

const ScratchIndex: React.FC<PageProps> = () => {
    const dispatch = useAppDispatch()

    const msg: Message = {
        displayTimeout: 5000,
        id: 0,
        uiFunction: UiFunction.Danger,
        details: 'Cannot change password, user is not signed in.',
        title: 'Error'
    };

    dispatch(connectToHub());
    dispatch(addMessage(msg));
    
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

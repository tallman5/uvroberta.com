import React, { ComponentPropsWithoutRef } from 'react'
import Header from './header';
import AutoMessages from '../features/app/autoMessages';

export interface ILayout extends ComponentPropsWithoutRef<'div'> {
    hideHeader?: boolean
}

const Layout = ({ children, hideHeader = false }: ILayout) => {
    return (
        <div style={{ minHeight: '100.vh', display: 'flex', flexDirection: 'column' }}>
            {
                (hideHeader == false)
                    ? <Header />
                    : null
            }
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <AutoMessages />
        </div>
    )
}

export default Layout
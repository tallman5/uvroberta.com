import React, { ComponentPropsWithoutRef } from 'react'
import Header from './header';

export interface ILayout extends ComponentPropsWithoutRef<'div'> {
    padTop?: boolean
}

const Layout = ({ children, padTop = true }: ILayout) => {
    return (
        <div style={{ minHeight: '100.1vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flexGrow: 1, marginTop: (padTop) ? '56px' : '0px' }}>
                {children}
            </main>
        </div>
    )
}

export default Layout
import { CSSProperties } from 'react'

export const DashFrontScale = 20;

export const Cover: CSSProperties = {
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100%',
}

export const DashBack: CSSProperties = {
    height: '100vh',
    width: '100vw',
    zIndex: 0,
}

export const DashFront: CSSProperties = {
    height: (DashFrontScale * 9) + 'px',
    left: 0,
    position: 'absolute',
    width: (DashFrontScale * 16) + 'px',
    zIndex: 10,
}

export const DashFrontBottom: CSSProperties = {
    ...DashFront,
    bottom: 0,
}

export const DashFrontTop: CSSProperties = {
    ...DashFront,
    bottom: (DashFrontScale * 9) + 'px',
}

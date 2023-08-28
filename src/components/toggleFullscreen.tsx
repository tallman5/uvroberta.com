import React, { ComponentPropsWithoutRef, useState } from 'react'

export interface IToggleFullscreen extends ComponentPropsWithoutRef<'button'> {
}

const ToggleFullscreen = ({ children, ...rest }: IToggleFullscreen) => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen()
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
        setIsFullscreen(!isFullscreen)
    }

    return (
        <button {...rest} onClick={toggleFullscreen}>{children}</button>
    )
}

export default ToggleFullscreen

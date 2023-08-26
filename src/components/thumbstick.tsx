import { isBrowser } from '@tallman/strong-strap'
import React, { useEffect, useState } from 'react'

const Thumbstick = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isTouching, setIsTouching] = useState(false);

    function startDragging(event) {
        event.preventDefault();
        const _isTouching = (event.touches) ? true : false
        const container = document.getElementById("thumbstickContainer")
        const rect = container?.getBoundingClientRect() 

        // const _bounds = {
        //     bottom: rect.bottom - this.state.thumbSize,
        //     height: rect.height - this.state.thumbSize,
        //     left: rect.left,
        //     right: rect.right - this.state.thumbSize,
        //     top: rect.top,
        //     width: rect.width - this.state.thumbSize,
        // }

    }

    function dragging(event) {
    }

    function stopDragging(event) {
    }

    useEffect(() => {
        if (!isBrowser) return;
        const joystickThumb = document.getElementById("joystickThumb")
        if (joystickThumb) {
            const listenerAttached = joystickThumb.getAttribute("listenerAttached") || false
            if (!listenerAttached) {
                joystickThumb.addEventListener("touchstart", startDragging, { passive: false })
                joystickThumb.addEventListener("mousedown", startDragging)
                joystickThumb.setAttribute("listenerAttached", 'true')
            }
        }

        return () => {
            const joystickThumb = document.getElementById("joystickThumb")
            if (joystickThumb) {
                joystickThumb.removeEventListener("touchstart", startDragging)
                joystickThumb.removeEventListener("mousedown", startDragging)
            }
        };
    }, [])

    return (
        <div id='thumbstickContainer' style={{ height: "200px", width: "200px", border: '2px solid red', borderRadius: '30px', marginBottom: '35px', marginRight: '10px' }}>
            <div id='thumbstickThumb' style={{ cursor: "move", position: "absolute", top: "70px", left: "70px", width: "60px", height: "60px", backgroundColor: "red", borderRadius: "30px", margin: "0px" }}></div>
        </div>
    )
}

export default Thumbstick

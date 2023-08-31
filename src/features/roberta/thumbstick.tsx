import React, { useState, useRef } from 'react';
import * as Styles from '../../styles'

interface ThumbstickProps {
    boxSize?: number;
    circleSize?: number;
    onXyChange?: (thumbPosition: ThumbPosition) => void;
    debug?: boolean;
    scaleTo?: number
}

export interface ThumbPosition {
    left: number,
    top: number,
    x: number,
    y: number
}

const Thumbstick: React.FC<ThumbstickProps> = ({ boxSize = 200, circleSize = 50, debug = false, onXyChange, scaleTo = 1000 }) => {
    const cen = (boxSize - circleSize) / 2;
    const range = cen * 2;
    const defPos: ThumbPosition = { left: cen, top: cen, x: 0, y: 0 }
    const [position, setPosition] = useState<ThumbPosition>(defPos);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const correction = -2;  // Account for container borders in the circle's position

    const getScaled = (value: number) => {
        const scaledValue = -scaleTo + value / (range - 0) * (scaleTo - -scaleTo);
        return Math.round(scaledValue);
    }

    const handleStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        if (circleRef.current) {
            circleRef.current.style.pointerEvents = 'none';

            const clientLeft = 'touches' in event ? event.touches[0].clientX : event.clientX;
            const clientTop = 'touches' in event ? event.touches[0].clientY : event.clientY;

            const startLeft = clientLeft - position.left;
            const startTop = clientTop - position.top;

            const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
                const moveClientLeft = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
                const moveClientTop = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

                const newLeft = moveClientLeft - startLeft;
                const newTop = moveClientTop - startTop;

                const boundingRect = circleRef.current?.parentElement?.getBoundingClientRect();
                if (boundingRect) {
                    const boundedLeft = Math.min(Math.max(newLeft, 0), boundingRect.width - circleSize);
                    const boundedTop = Math.min(Math.max(newTop, 0), boundingRect.height - circleSize);

                    const newThumbPos: ThumbPosition = {
                        left: boundedLeft,
                        top: boundedTop,
                        x: getScaled(boundedLeft),
                        y: getScaled(boundedTop) * -1
                    }

                    setPosition(newThumbPos);
                    if (onXyChange) onXyChange(newThumbPos);
                }
            };

            const handleEnd = () => {
                if (circleRef.current) {
                    circleRef.current.style.pointerEvents = 'auto';
                    document.removeEventListener('mousemove', handleMove);
                    document.removeEventListener('touchmove', handleMove);
                    document.removeEventListener('mouseup', handleEnd);
                    document.removeEventListener('touchend', handleEnd);
                }
                setPosition(defPos);
                if (onXyChange) onXyChange(defPos);
            };

            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchend', handleEnd);
        }
    };

    return (
        <div>
            <div style={{ ...Styles.ThumbstickContainer, width: boxSize, height: boxSize, borderRadius: `${circleSize / 2}px` }}>
                <div
                    style={{
                        ...Styles.ThumbstickThumb,
                        width: circleSize,
                        height: circleSize,
                        transform: `translate(${position.left + correction}px, ${position.top + correction}px)`,
                        transformOrigin: 'center center',
                    }}
                    ref={circleRef}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                />
            </div>
            {
                (debug)
                    ?
                    <>
                        <br />
                        <div style={{ backgroundColor: '#00000044', color: 'white', padding: '3px' }}>
                            Left: {position.left.toString().padStart(3, "0")},
                            Top: {position.top.toString().padStart(3, "0")}
                            <br />
                            X: {position.x.toString().padStart(4, "0")},
                            Y: {position.y.toString().padStart(4, "0")}
                        </div>
                    </>
                    : null
            }
        </div>
    );
};

export default Thumbstick;

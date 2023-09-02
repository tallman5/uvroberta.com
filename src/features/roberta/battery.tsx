import React, { useEffect, useRef, useState } from 'react'

export interface BatteryProps {
    battPercent?: number
    isHorizontal?: boolean
}

const Battery: React.FC<BatteryProps> = ({ battPercent = 0, isHorizontal = false }) => {
    const bgColor = "#555"
    const [color, setColor] = useState(bgColor);
    const [levelCount, setLevelCount] = useState(0);

    useEffect(() => {
        let newLevelCount = 5
        let newColor = "#019444"

        if (battPercent < 90) {
            newLevelCount = 4
            newColor = "#8EC63F"
        }
        if (battPercent < 70) {
            newLevelCount = 3
            newColor = "#F8ED33"
        }
        if (battPercent < 50) {
            newLevelCount = 2
            newColor = "#FCB040"
        }
        if (battPercent < 30) {
            newLevelCount = 1
            newColor = "#EF4136"
        }

        setLevelCount(newLevelCount);
        setColor(newColor);

    }, [battPercent])

    return (
        <div>
            {(isHorizontal) ?
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", backgroundColor: bgColor, height: "3vw", width: "13vw", borderRadius: ".5vw", paddingTop: ".53vw" }}>
                        <div style={{ backgroundColor: color, height: "2vw", width: "2vw", borderRadius: ".3vw", marginLeft: ".5vw" }}></div>
                        <div style={{ visibility: (levelCount > 1) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "2vw", borderRadius: ".3vw", marginLeft: ".5vw", }}></div>
                        <div style={{ visibility: (levelCount > 2) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "2vw", borderRadius: ".3vw", marginLeft: ".5vw", }}></div>
                        <div style={{ visibility: (levelCount > 3) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "2vw", borderRadius: ".3vw", marginLeft: ".5vw", }}></div>
                        <div style={{ visibility: (levelCount > 4) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "2vw", borderRadius: ".3vw", marginLeft: ".5vw", }}></div>
                    </div>
                    <div style={{ backgroundColor: bgColor, height: "2vw", width: "1vw", borderRadius: ".5vw", marginTop: ".5vw", marginLeft: "-.5vw" }}>&nbsp;</div>
                </div>
                :
                <div>
                    <div style={{ border: "1px solid #555", backgroundColor: bgColor, height: ".5vw", width: "2vw", borderTopLeftRadius: ".5vw", borderTopRightRadius: ".5vw", marginLeft: ".5vw" }}>&nbsp;</div>
                    <div style={{ border: "1px solid #555", backgroundColor: bgColor, height: "13vw", width: "3vw", borderRadius: ".5vw", paddingLeft: ".4vw", paddingTop: ".4vw" }}>
                        <div style={{ visibility: (levelCount > 4) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "1.9vw", borderRadius: ".3vw" }}></div>
                        <div style={{ visibility: (levelCount > 3) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "1.9vw", borderRadius: ".3vw", marginTop: ".5vw" }}></div>
                        <div style={{ visibility: (levelCount > 2) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "1.9vw", borderRadius: ".3vw", marginTop: ".5vw" }}></div>
                        <div style={{ visibility: (levelCount > 1) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "1.9vw", borderRadius: ".3vw", marginTop: ".5vw" }}></div>
                        <div style={{ visibility: (levelCount > 0) ? "visible" : "hidden", backgroundColor: color, height: "2vw", width: "1.9vw", borderRadius: ".3vw", marginTop: ".5vw" }}></div>
                    </div>
                </div>
            }
            <div className="text-center">{battPercent}%</div>
        </div>
    )
}

export default Battery

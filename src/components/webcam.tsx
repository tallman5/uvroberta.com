import React, { useEffect, useRef, useState } from 'react'
import * as Styles from '../styles'
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { StaticImage } from 'gatsby-plugin-image';

export interface WebcamProps {
    showObjects?: boolean
    src: string
}

const Webcam: React.FC<WebcamProps> = ({ showObjects = false, src }) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imgReady, setImgReady] = useState(false);
    const [tfReady, setTfReady] = useState(false);

    useEffect(() => {
        tf.ready().then(() => {
            setTfReady(true);
        });
    }, []);

    useEffect(() => {
        if (!imgReady || !tfReady || !showObjects) return

        const runObjectDetection = async () => {
            const net = await cocossd.load();
            const imgElement = imgRef.current;
            const canvasElement = canvasRef.current;

            if (imgElement && canvasElement) {
                canvasElement.width = imgElement.width;
                canvasElement.height = imgElement.height;

                const ctx = canvasElement.getContext('2d');
                async function detectObjects() {
                    if (imgElement) {
                        const predictions = await net.detect(imgElement);

                        if (ctx) {
                            // Draw video frame and bounding boxes on canvas
                            ctx.drawImage(imgElement, 0, 0, 640, 480);
                            predictions.forEach(prediction => {
                                const [x, y, width, height] = prediction.bbox;
                                ctx.beginPath();
                                ctx.rect(x, y, width, height);
                                ctx.strokeStyle = 'red';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.fillStyle = 'red';
                                ctx.fillText(prediction.class, x, y - 5);
                            });

                            requestAnimationFrame(detectObjects);
                        }
                    }
                }

                detectObjects();
            }
        };

        if (showObjects) {
            runObjectDetection();
        }
    }, [imgReady, tfReady]);

    return (
        <>
            (showObjects) ?
            <>
                <img ref={imgRef} crossOrigin='anonymous' src={src} style={{ ...Styles.Cover, display: 'none' }} onLoad={() => setImgReady(true)} />
                <canvas ref={canvasRef} style={Styles.Cover} />
            </>
            : <img src={src} style={Styles.Cover} onLoad={() => setImgReady(true)} />

            <StaticImage src='../images/patience.webp' alt='Waiting' style={{ ...Styles.Cover, display: (imgReady) ? 'none' : 'unset' }} />
        </>
    )
}

export default Webcam

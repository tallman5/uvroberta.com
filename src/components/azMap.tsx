import { isBrowser } from '@tallman/strong-strap';
import React, { useEffect, useState } from 'react'

const AzMap = () => {
    const [defCenter] = useState([-75.507144, 40.229057]);
    const [elementId] = useState("mapDiv");

    function waitForAtlas() {
        if (typeof atlas === 'undefined') {
            setTimeout(waitForAtlas, 1000);
        }
        else {
            const amk = process.env.AZ_MAP_KEY
            console.log("AZ: " + amk);
            const newMap = new atlas.Map(elementId, {
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: amk,
                },
                center: defCenter,
                style: 'satellite',
                zoom: 19,
            });
        }
    }

    useEffect(() => {
        if (!isBrowser) return;

        const cssUrls = [
            "https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css",
            // "https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
        ]
        cssUrls.forEach(cssUrl => {
            const cssElement = document.querySelector('link[href="' + cssUrl + '"]');
            if (!cssElement) {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = cssUrl;
                document.head.appendChild(css);
            }
        });

        const jsUrls = [
            "https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js",
        ]
        jsUrls.forEach(jsUrl => {
            const jsElement = document.querySelector('script[src="' + jsUrl + '"]');
            if (!jsElement) {
                const js = document.createElement('script');
                js.src = jsUrl;
                document.head.appendChild(js);
            }
        });

        waitForAtlas();
    }, []);

    return (
        <div id={elementId} style={{ height: "100%", border: "1px solid red" }} />
    )
}

export default AzMap

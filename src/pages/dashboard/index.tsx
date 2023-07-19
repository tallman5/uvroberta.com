import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { isBrowser } from "@tallman/strong-strap/dist/utilities";
import Layout from '../../components/layout';
import { Map, AuthenticationType } from 'azure-maps-control';

const DashboardIndex: React.FC<PageProps> = () => {
    const [mapElementId] = React.useState("mapDiv");
    const [atlas, setAtlas] = React.useState<any>();
    const [map, setMap] = React.useState<any>();
    const [robertaMarker, setRobertaMarker] = React.useState();

    React.useEffect(() => {
        if (!isBrowser) return;

        ensureMapResources();

        const newMap = new Map(mapElementId, {
            center: [-75.507144, 40.229057],
            zoom: 19,
            style: 'satellite',
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: process.env.AZ_MAP_KEY
            }
        });
        setMap(newMap);

        // const newMap = new atlas.Map(mapElementId, {
        //     authOptions: {
        //         authType: 'subscriptionKey',
        //         subscriptionKey: process.env.AZ_MAP_KEY,
        //     },
        //     center: [-75.507144, 40.229057],
        //     style: 'satellite',
        //     zoom: 19,
        // });

        // import('azure-maps-control').then((newAtlas) => {
        //     setAtlas(newAtlas);
        //     console.log(newAtlas);
        // })

        // const option: IAzureMapOptions = {
        //     authOptions: {
        //         authType: AuthenticationType.subscriptionKey,
        //         subscriptionKey: process.env.AZ_MAP_KEY,
        //     },
        // }

        // ensureMapResources();

        // const newMap = new atlas.Map("mapDiv", {
        //     authOptions: {
        //         authType: 'subscriptionKey',
        //         subscriptionKey: mapKey
        //     },
        //     center: defCenter,
        //     style: 'satellite',
        //     zoom: 19,
        // });

        // robertaMarker = new azmaps.HtmlMarker({
        //     position: [-75.507144, 40.229057],
        //     htmlContent: '<img src="../../roberta-top.webp" alt="Roberta" style="width: 48px;" />',
        // });

        // map.markers.add(robertaMarker);

        return () => { map?.dispose(); };
    }, []);

    function ensureMapResources() {
        const cssUrls = [
            "https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css",
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
    }

    return (
        <Layout padTop={false}>
            <div style={{ height: '100vh', width: '100vw' }} title={process.env.AZ_MAP_KEY}>
                <div id={mapElementId} style={{ height: '100%', width: '100%' }} />
            </div>
        </Layout>
    )
}

export default DashboardIndex

export const Head: HeadFC = () => <title>Dashboard | uvroberta.com</title>

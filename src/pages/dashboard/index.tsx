import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import * as azmaps from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.css';

const DashboardIndex: React.FC<PageProps> = () => {
    const robertaMarker = new azmaps.HtmlMarker({
        position: [-75.507144, 40.229057],
        htmlContent: '<img src="../../roberta-top.webp" alt="Roberta" style="width: 48px;" />',
    });

    React.useEffect(() => {
        // Create a new map instance
        const map = new azmaps.Map('map', {
            authOptions: {
                authType: azmaps.AuthenticationType.subscriptionKey,
                subscriptionKey: process.env.AZ_MAP_KEY,
            },
            center: [-75.507144, 40.229057],
            style: 'satellite',
            zoom: 19,
        });

        map.markers.add(robertaMarker);

        return () => { map.dispose(); };
    }, []);

    return (
        <div style={{}}>
            <div id='map' style={{ height: '100vh', width: '100vw' }} />
        </div>
    )
}

export default DashboardIndex

export const Head: HeadFC = () => <title>Dashboard | uvroberta.com</title>

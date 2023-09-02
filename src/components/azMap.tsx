import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useAppSelector } from '../context';
import { selectRoberta } from '../features/roberta/robertaSlice';
import useAtlas from '@tallman/strong-strap/dist/hooks/useAtlas';

export interface IAzMap extends ComponentPropsWithoutRef<'div'> {
}

const AzMap = ({ style: addedStyles, ...rest }: IAzMap) => {
    const a = useAtlas();
    const [imageId] = useState("robertaTop");
    const [defCenter] = useState([-75.507144, 40.229057]);
    const [elementId] = useState("mapDiv");
    const [map, setMap] = useState();
    const [robertaMarker, setRobertaMarker] = useState();
    const robertaState = useAppSelector(selectRoberta);

    useEffect(() => {
        if (!a) return;

        var newMap = new a.Map(elementId, {
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: process.env.GATSBY_AZ_MAP_KEY,
            },
            center: defCenter,
            style: 'satellite',
            zoom: 19,
        });
        setMap(newMap);

        var newRobertaMarker = new a.HtmlMarker({
            id: imageId,
            htmlContent: "<img id='" + imageId + "' src='../../roberta-top.webp' style='width: 48px;' alt='Roberta' />",
            position: defCenter,
        });
        setRobertaMarker(newRobertaMarker);
        newMap.markers.add(newRobertaMarker);

    }, [a])

    useEffect(() => {
        if (!map || !robertaMarker) return;

        map.setCamera({
            center: [robertaState.gpsState.longitude, robertaState.gpsState.latitude]
        })

        robertaMarker.setOptions({
            position: [robertaState.gpsState.longitude, robertaState.gpsState.latitude],
            htmlContent: "<img id='" + imageId + "' src='../../roberta-top.webp' style='width: 48px; transform: rotate(" + robertaState.gpsState.heading + "deg)' alt='Roberta' />",
        });
    }, [robertaState])

    return (
        <div id={elementId} style={{ ...addedStyles }} {...rest} />
    )
}

export default AzMap

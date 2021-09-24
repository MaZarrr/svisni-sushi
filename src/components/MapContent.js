import React from 'react'
import { Map, Placemark } from "react-yandex-maps"
import styled from '@emotion/styled'

const MapContainer = styled.div`
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        width: 90%;
        margin: 20px auto 50px auto;
        .mapStyle {
            width: 100%;
            height: 700px;
            padding: 30px;
            margin: auto;
            @media (max-width: 768px) {
              height: 400px;
              padding: 10px;
        }
    }
`

const MapContent = () => (
    <MapContainer>
      <Map
        defaultState={{
          center: [50.077763, 38.031733],
          zoom: 14.5,
          controls: ['zoomControl', 'fullscreenControl'],
          behaviors: ['drag', 'dblClickZoom', 'multiTouch'] }}
        modules={['control.ZoomControl', 'control.FullscreenControl']}
        className="mapStyle"
        properties={{
          balloonContentBody:
            'Суши бар Свисни Суши в Уразово',
        }}>
        <Placemark
          defaultGeometry={[50.077763, 38.031733]}
          modules={["geoObject.addon.balloon"]}
          properties={{
            balloonContentHeader: "Свисни Суши",
            balloonContent: 'ул.3-го Интернационала д.48а, Уразово'
          }}
        />
      </Map>
    </MapContainer>
  )

export default MapContent
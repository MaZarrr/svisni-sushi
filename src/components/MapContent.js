import React, { useEffect, useState } from 'react'
import { Map, Placemark, RouteButton } from '@pbe/react-yandex-maps';
import styled from '@emotion/styled'

const MapContainer = styled("div")(({ theme }) => ({
  boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
  width: "90%",
  margin: "20px auto 50px auto",
  padding: "30px",

  "& .mapStyle": { 
    width: "100%",
    height: "700px",
    padding: "30px",
    margin: "auto",

    [theme.breakpoints.down("md")]: {
      height: "400px",
      padding: "10px",
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: 0,
    margin: 0,
    width: '100%'
  },
}));


const MapContent = ({ value }) => {
 
  const [mapState, setMapState] = useState({
      center: [55.751574, 37.573856], // Начальные координаты (Москва)
      zoom: 16.5,
      controls: ["zoomControl", "fullscreenControl"],
      behaviors: ["drag", "dblClickZoom", "multiTouch"],
      properties: {
        balloonContentBody: 'Суши бар Свисни Суши в Валуйках',
      }
    });

    const [placemarkCoords, setPlacemarkCoords] = useState([50.081738, 38.025075]); // Начальные координаты

    const movePlacemark = ({ lat, son }) => {
      setPlacemarkCoords([lat, son]); 
    };

  const updateCenter = ({ lat, son }) => {
    setMapState((prevState) => ({
      ...prevState,
      center: [lat, son],
    }));
  };

    useEffect(() => {

      if(value === 0) {
        updateCenter({ lat: 50.219224, son: 38.097911  })
        movePlacemark({  lat: 50.219224, son: 38.097911})
      } else {
        updateCenter({ lat: 50.081738, son: 38.025075 })
        movePlacemark({ lat: 50.081738, son: 38.025075})
      }
    }, [value])

 
    return (
    <MapContainer>
      <Map
        state={mapState} 
        // defaultState={{
        //   center: [coords.lat, coords.son],
        //   zoom: 16.5,
        //   controls: ['zoomControl', 'fullscreenControl'],
        //   behaviors: ['drag', 'dblClickZoom', 'multiTouch'] }}
        modules={['control.ZoomControl', 'control.FullscreenControl']}
        className="mapStyle"
>
        <Placemark
          // defaultGeometry={[coords.lat, coords.son]}
          geometry={placemarkCoords}
          modules={["geoObject.addon.balloon"]}
          properties={{
            balloonContentHeader: "Свисни Суши",
            balloonContent: 'г.Валуйки, ул.Толстого 16/2'
          }}
        />
        <RouteButton options={{ float: "right" }} />
          {/* <RoutePanel options={{ float: "right" }} /> */}
      </Map>
    </MapContainer>
  )
        }

export default MapContent
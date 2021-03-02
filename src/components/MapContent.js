import React from 'react'
import { Map, Placemark, RouteButton } from "react-yandex-maps"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

export default () => {
  const classes = useStyleMap();

  return (
  <>
    <div>
      <Typography className={classes.titleSub} variant={"inherit"} component={"h2"}>Наш адрес</Typography>
      <Typography variant={"subtitle1"}>3-го Интернационала д.48а, Уразово</Typography>
    </div>
    <div className={classes.mapContainer}>
    <Map
    defaultState={{
      center: [50.077763, 38.031733],
      zoom: 17,
      controls: ['zoomControl', 'fullscreenControl'],
      behaviors: ["disable('drag')"]}}
    modules={['control.ZoomControl', 'control.FullscreenControl']}
    className={classes.mapStyle}
    properties={{
      balloonContentBody:
        'Суши бар Свисни Суши в Уразово',
    }}>
    <RouteButton options={{ float: 'right' }} />
    <Placemark
      defaultGeometry={[50.077763, 38.031733]}
    />
  </Map>
  </div>
  </>
  )
}

const useStyleMap = makeStyles(theme => ({
  titleSub: {
    fontSize: '28px',
    fontWeight: `bold`,
    width: `100%`,
    [theme.breakpoints.down('600')]: {
      fontSize: '22px',
    },
  },
  mapContainer: {
    boxShadow: `0px 5px 10px 2px rgba(34, 60, 80, 0.2)`,
    width: `100%`,
    margin: `20px auto 50px auto`,
  },
  mapStyle: {
    width: `100%`,
    height: `600px`,
    padding: 30,
    margin: `auto`,
    [theme.breakpoints.down('600')]: {
      height: `400px`,
      padding: 10,
    },
  }
}));
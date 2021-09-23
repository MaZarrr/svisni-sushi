import React from 'react'
import ContentLoader from "react-content-loader"
import { Grid } from "@material-ui/core";

const Spinner = (props) => (
    <Grid container justifyContent={"space-around"} direction={"row"} style={{marginTop: 15}}>
        { Array(props.count).fill(0).map((_, index) =>
            <Grid item key={index} xs={12} sm={3} >
            <div style={{width: `290px`, height: `630px`, margin: `0 auto`}}>
            <ContentLoader
                speed={1}
                width={290}
                height={630}
                viewBox="0 0 290 630"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}>

                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                <circle cx="20" cy="20" r="20" />
                <rect x="0" y="55" rx="0" ry="0" width="290" height="290" />
                <rect x="15" y="367" rx="0" ry="0" width="260" height="60" />
                <rect x="22" y="440" rx="5" ry="5" width="119" height="31" />
                <rect x="159" y="440" rx="5" ry="5" width="119" height="31" />
                <rect x="47" y="480" rx="3" ry="3" width="70" height="40" />
                <rect x="190" y="480" rx="3" ry="3" width="70" height="40" />
            </ContentLoader>
                </div>
            </Grid>
        )}
    </Grid>
)

export default Spinner;



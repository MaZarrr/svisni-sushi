import React from "react"
import {StylingInfo} from '../components/common/style'
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import ButtonBackSet from "./common/ButtonBackSet";

const LayoutItem = (props) => {

return (
<StylingInfo>
    <div className="container">
        <ButtonBackSet back="/sety" />
        <h1 itemProp="name" style={{fontFamily: `Oswald, cursive`,
            fontWeight: 600, fontSize: 40}}>{props.name}</h1>
    <hr></hr>
    {/*<Grid container>*/}
        { props.image &&
            <Grid item xs={12} sm={6}>
                <Img itemprop="image" style={{maxWidth: 400}} fluid={props.image}/>
            </Grid>
        }
    {/*<Grid item xs={12} sm={5} style={{margin: `auto 0`}}>*/}
        {props.children}
    {/*</Grid>*/}
    {/*</Grid>*/}
    </div>
</StylingInfo>

    )
}

export default LayoutItem


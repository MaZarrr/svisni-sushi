import React from "react"
import {StylingInfo} from '../components/common/style'
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const LayoutItem = (props) => {
return (
<StylingInfo>
    <Container>
        <h1 itemProp="name" style={{fontFamily: `Oswald, cursive`,
            fontWeight: 600, fontSize: 39}}>{props.name}</h1>
    <Divider/>
        { props.image &&
            <Grid item xs={12} sm={6}>
                    <Img itemProp="image" fluid={props.image}/>
            </Grid>
        }
        {props.children}
    </Container>
</StylingInfo>

    )
}

export default LayoutItem


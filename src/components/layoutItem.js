import React from "react"
import {StyleH1Layout} from '../components/common/style'
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const LayoutItem = (props) => {
return (
    <Container>
        <div style={{marginTop: 80}}>
        <StyleH1Layout itemProp="name" >{props.name}</StyleH1Layout>
    <Divider/>
        { props.image &&
            <Grid item xs={12} sm={6}>
                    <Img itemProp="image" fluid={props.image}/>
            </Grid>
        }
        {props.children}
        </div>
    </Container>
    )
};

export default LayoutItem


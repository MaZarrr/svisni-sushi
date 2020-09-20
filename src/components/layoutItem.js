import React from "react"
import {StyleH1Layout as H1Tag, WrappedContentLayout} from '../components/common/style'
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import {Container} from "@material-ui/core";

const LayoutItem = (props) => {
return (
    <Container>
        <WrappedContentLayout>
        <H1Tag itemProp="name" >{props.name}</H1Tag>
        { props.image &&
            <Grid item xs={12} sm={6}>
                    <Img itemProp="image" fluid={props.image}/>
            </Grid>
        }
        {props.children}
        </WrappedContentLayout>
    </Container>
    )
};

export default LayoutItem


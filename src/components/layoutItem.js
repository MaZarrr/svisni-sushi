import React from "react"
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';
import HeadSection from "./HeadSection"

const LayoutItem = (props) => {
return ( <div>
      <HeadSection titleTXT={props.name}/>
        { props.image &&
            <Grid item xs={12} sm={6}>
                    <Img itemProp="image" fluid={props.image}/>
            </Grid>
        }
        {props.children}
      </div>
        )
};

export default LayoutItem


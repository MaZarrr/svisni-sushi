import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import Grid from '@material-ui/core/Grid';
import HeadSection from "./HeadSection"

const LayoutItem = (props) => {
return (
  <div>
        <HeadSection titleTXT={props.name}/>
          { props.image &&
              <Grid item xs={12} sm={6}>
                      <GatsbyImage image={props.image} itemProp="image" />
              </Grid>
          }
          {props.children}
        </div>
);
};

export default LayoutItem


import React from "react"
import HeadSection from "./HeadSection"

const LayoutItem = (props) => {
return (
  <div>
        <HeadSection titleTXT={props.name}/>
          {props.children}
        </div>
);
};

export default LayoutItem

// {/*{ props.image &&*/}
// {/*    <Grid item xs={12} sm={6}>*/}
// {/*            <GatsbyImage image={props.image} itemProp="image" />*/}
// {/*    </Grid>*/}
// {/*}*/}


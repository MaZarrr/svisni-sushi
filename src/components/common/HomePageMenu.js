import Grid from "@material-ui/core/Grid";
import {Link} from "gatsby";
import Img from "gatsby-image";
import React from "react";

export default ({dataIndex}) => (
    <>
    {dataIndex.map(({node: homeMenu}) => (
        <Grid item xs={6} sm={4} key={homeMenu.id} >
            <div className="cart_item">
                <Link to={`/${homeMenu.slug}`}>
                    <div className="cart_title">
                        <h3><b>{homeMenu.category}</b></h3>
                    </div>
                    <Img fluid={homeMenu.image.fluid} className="cart_img" imgStyle={{maxWidth: 300}} />
                </Link>
            </div>
        </Grid>
    ))}
    </>
    )

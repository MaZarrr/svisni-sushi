import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from 'prop-types';
import "./header.css"
import Img  from 'gatsby-image';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import {Hidden} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

const styles = theme =>( {
    root: {
        top: '60px',
        background: `#ffcccc`,
        [theme.breakpoints.up('600')]: {
            top: '65px',
        },
    },
    imageMenu: {
        width: 35
    },
    tabs: {
        height: 50,
        backgroundColor: `white`,
        [theme.breakpoints.up('600')]: {
            height: '78px'
        },
    },
    labelIcon: {
        minHeight: 0,
        textDecoration: `none`,
        [theme.breakpoints.up('600')]: {
            minHeight: '72px'
        },
    }
});

function HideOnScroll(props) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}

const AppBars = (props) => {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const data = useStaticQuery(graphql `
        query {
            allContentfulIconMenuLeftPanel(sort: {fields: deck}) {
                edges {
                    node {
                        id
                        name
                        deck
                        slug
                        image {
                            fluid(maxWidth: 70) {
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                }
            }
        }
    `)

    function a11yProps(index){
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    return (
        <HideOnScroll>
            <AppBar className={props.classes.root}>
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                scrollButtons="auto">

                {/*<Hidden smUp>*/}
                {data.allContentfulIconMenuLeftPanel.edges.map(({node: menu}, index) => (
                        <Tab key={menu.id}
                             style={{textDecoration: `none`}}
                             textColor={"primary"}
                             classes={{ labelIcon: props.classes.labelIcon }}
                             className={props.classes.tabs}
                             component={Link}
                             to={`/${menu.slug}`}
                             value={index + 1}
                             icon={<Hidden xsDown>
                                 <Img fluid={menu.image.fluid}
                                       className={props.classes.imageMenu}
                                       imgStyle={{maxWidth: 55}}
                                       alt={menu.name} /></Hidden>}
                                        label={<Typography style={{fontSize: 16}}
                                                           variant={"subtitle2"}>{menu.name}
                                                </Typography>} {...a11yProps(menu.deck)}/>))}
                            </Tabs>
                    </AppBar>
        </HideOnScroll>
    );
};

AppBars.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(AppBars);


import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

const styles = theme =>( {
    root: {
        top: '60px',
        background: `#ffcccc`,
        margin: 0,
        padding: 0,
        [theme.breakpoints.up('600')]: {
            top: '75px',
        },
    },
    tabs: {
        height: 50,
        backgroundColor: `white`,
        textDecoration: `none`,
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
    const trigger = useScrollTrigger({ threshold: 550 });

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

    const { allContentfulIconMenuLeftPanel } = useStaticQuery(graphql `
        query {
            allContentfulIconMenuLeftPanel(sort: {fields: deck}) {
                edges {
                    node {
                        id
                        name
                        deck
                        slug
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
            <AppBar component="ul" className={props.classes.root}>
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                scrollButtons="auto">

                {allContentfulIconMenuLeftPanel.edges.map(({node: menu}, index) => (
                        <Tab key={menu.id}
                             textColor={"primary"}
                             classes={{ labelIcon: props.classes.labelIcon }}
                             className={props.classes.tabs}
                             component={Link}
                             to={`/${menu.slug}/`}
                             value={index + 1}
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


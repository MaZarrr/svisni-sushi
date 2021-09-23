import React from "react"
import { Link } from "gatsby"
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
        background: `#fff`,
        margin: 0,
        padding: 0,
        [theme.breakpoints.up('600')]: {
            top: '75px',
        },
    },
        scrollButtons: {
            backgroundColor: theme.palette.common.hardPink
        },
        indicator: {
            backgroundColor: theme.palette.common.blueDef
        },
        // "@global": {
        //     ".MuiTypography-h1": {
        //         fontSize: "30rem"
        //     }
        // }

// tabs: {
    //     height: 50,
    //     backgroundColor: `white`,
    //     textDecoration: `none`,
    //     [theme.breakpoints.up('600')]: {
    //         height: '78px'
    //     },
    // },
    // labelIcon: {
    //     minHeight: 0,
    //     textDecoration: `none`,
    //     [theme.breakpoints.up('600')]: {
    //         minHeight: '72px'
    //     },
    // }
});

function HideOnScroll(props) {
    const trigger = useScrollTrigger({ threshold: 550 });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}


const barsLinks = [
    {
        key: 1,
        name: "Сеты",
        slug: "sety",
    },
    {
        key: 2,
        name: "Горячие роллы",
        slug: "hot-rolls",
    },
    {
        key: 3,
        name: "Сложные роллы",
        slug: "branded-rolls",
    },
    {
        key: 4,
        name: "Пицца",
        slug: "pizza",
    },
    {
        key: 5,
        name: "Комбо",
        slug: "kombo",
    },
    {
        key: 6,
        name: "Классические роллы",
        slug: "small-rolls",
    },
    {
        key: 7,
        name: "Вок",
        slug: "wok",
    },
    {
        key: 8,
        name: "Суши",
        slug: "sushi",
    },
    {
        key: 9,
        name: "Гунканы",
        slug: "gunkany",
    },
    {
        key: 10,
        name: "Салаты",
        slug: "salaty",
    },
    {
        key: 11,
        name: "Закуски",
        slug: "zakyski",
    },
    {
        key: 12,
        name: "Напитки",
        slug: "napitki",
    },
    {
        key: 13,
        name: "Соусы",
        slug: "souses",
    }

]

const AppBars = (props) => {
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                variant="scrollable"
                value={value}
                classes={{ indicator: props.classes.indicator, scrollButtons: props.classes.scrollButtons }}
                onChange={handleChange}
                scrollButtons="auto"
            >
                { barsLinks.map(({key, name, slug}, index) => (
                                <Tab key={key}
                                component={Link}
                                to={`/${slug}/`}
                                value={index + 1}
                                label={<Typography variant={"body1"}>{name}
                                    </Typography>} {...a11yProps(key)}/>))}
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


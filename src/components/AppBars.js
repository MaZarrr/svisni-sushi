import React from "react"
import { Link } from "gatsby"
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import withStyles from '@mui/styles/withStyles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";


const TabsStyle = styled(Tabs)(({ theme }) => ({
    '.MuiTabs-indicator': {
        backgroundColor: theme.palette.common.lightBlue
    },
    '.MuiTabs-scrollButtons': {
        backgroundColor: theme.palette.common.hardPink
    },
    '.MuiTabs-flexContainer': {
        '@media screen and (min-width: 1700px) ': {
            justifyContent: 'center',
          },
    }
    
}))

const styles = theme =>( {
    root: {
        top: '60px',
        backgroundColor: '#fff',
        margin: 0,
        padding: 0
    },
        scrollButtons: {
            backgroundColor: theme.palette.common.hardPink
        },
        indicator: {
            backgroundColor: "yellow"
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
            <AppBar
            sx={{
                top: '70px',
                backgroundColor: '#fff',
                margin: 0,
                padding: 0,
                zIndex: 1050
            }}
            component="ul">
            <TabsStyle
                variant="scrollable"
                value={value}
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
            </TabsStyle>
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


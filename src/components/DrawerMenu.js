import React from 'react';
import clsx from 'clsx';
import PhoneIcon from '@material-ui/icons/Phone';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "gatsby";
import RoomIcon from "@material-ui/icons/Room";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import Divider from '@material-ui/core/Divider';
import WorkIcon from '@material-ui/icons/Work';
import { SwipeableDrawer, Typography } from "@material-ui/core"
import { StaticImage } from "gatsby-plugin-image";
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import CardGiftcardTwoToneIcon from '@material-ui/icons/CardGiftcardTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { SocialButtons } from './common/SocialButtons';

// import { useReactiveVar } from '@apollo/client';
// import { isLoggedInVar } from '../gatsby-theme-apollo/client';

const useStyles = makeStyles(({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        color: `tomato`,
        borderRadius: `50px`,
        border: `1px solid tomato`
    }
}));

const drawerMenuProps = [
    {
        id: 1,
        slug: "/orders",
        nameCategory: "Мои заказы",
        componentIcon: EventNoteTwoToneIcon,
        isAuth: false
    },
    {
        id: 2,
        slug: "/settings",
        nameCategory: "Настройки профиля",
        componentIcon: PersonOutlineTwoToneIcon,
        isAuth: false
    },
    {
        id: 3,
        slug: "/sale",
        nameCategory: "Акции",
        componentIcon: CardGiftcardTwoToneIcon,
        isAuth: true
    },
    {
        id: 4,
        slug: "/adres-i-kontakty",
        nameCategory: "Адрес",
        componentIcon: RoomIcon,
        isAuth: true
    },
    {
        id: 5,
        slug: "/dostavka-i-oplata",
        nameCategory: "Доставка",
        componentIcon: LocalTaxiIcon,
        isAuth: true
    },
    {
        id: 6,
        slug: "/vacancy",
        nameCategory: "Вакансии",
        componentIcon: WorkIcon,
        isAuth: true
    },
    {
        id: 7,
        slug: "",
        href: "tel:+79040949222",
        nameCategory: "Позвоните нам",
        componentIcon: PhoneIcon,
        isAuth: true,
        callPhone: true
    },
    {
        id: 8,
        slug: "",
        nameCategory: "Выход",
        componentIcon: ExitToAppTwoToneIcon,
        logout: true,
        isAuth: false
    }
    
]

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});
    // const isLoggedIn = useReactiveVar(isLoggedInVar)p


    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {[classes.fullList]: anchor === 'top' || anchor === 'bottom'})}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>

            <div style={{background: `red`, width: `100%`, paddingBottom: 15}}>
                <div style={{maxWidth: 90, height: 90, margin: `0 auto 0 auto`, paddingTop: 15 }}>
                    <StaticImage 
                        loading={"eager"} 
                        src="../images/logosvisni.png" 
                        alt={"Свистни суши в Уразово"}/>
                </div>
            <Typography 
            style={{color: `white`, textAlign: `center`, marginTop: 20}} 
            variant={'subtitle1'}>Уразово</Typography>
            </div>

            <NavigationButtons />
            <SocialButtons />

        </div>
    );

    return (
        <React.Fragment key={'left'}>
            <IconButton className={classes.menuButton} onClick={toggleDrawer('left', true)}>
                <MenuIcon fontSize={"small"} />
            </IconButton>
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}>
                {list('left')}
            </SwipeableDrawer>
        </React.Fragment>
    );
}



const NavigationButtons = () => (
        <List>
        {
            drawerMenuProps.map(item => {
                const TheIcon = item.componentIcon
                return item.isAuth && (
                <div key={item.slug}>
                <ListItem
                    button 
                    component={item.slug !== "" ? Link: "a"}
                    {...(item.callPhone && { href: item.href })}
                    to={item.slug} 
                    activeStyle={{ color: "#000", backgroundColor: `#f0ecec`}}>
                <ListItemIcon>
                    <TheIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary={item.nameCategory} />
                </ListItem>
                <Divider/>
                </div>
                )
            })
        }
        </List>
)

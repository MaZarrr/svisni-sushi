import React from 'react';
import clsx from 'clsx';
import PhoneIcon from '@mui/icons-material/Phone';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "gatsby";
import RoomIcon from "@mui/icons-material/Room";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';
import { SwipeableDrawer, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image";
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { SocialButtons } from './common/SocialButtons';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles(({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
}));



export default function TemporaryDrawer({ isLoggedIn }) {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});
    const drawerMenuProps = [
        {
            id: 1,
            slug: "/orders",
            nameCategory: "Мои заказы",
            componentIcon: EventNoteTwoToneIcon,
            isAuth: true
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
            nameCategory: isLoggedIn ? "Выйти" : "Войти" ,
            componentIcon: isLoggedIn ? LogoutIcon : LoginIcon,
            checkAuth: true,
            callPhone: false,
            isAuth: true
        }
    ]
    console.log("isLoggedIn", isLoggedIn);
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

            <NavigationButtons isLoggedIn={isLoggedIn} drawerMenuProps={drawerMenuProps} />
            <SocialButtons />

        </div>
    );

    return (
        <div key={'left'} style={{zIndex: 2000}}>
            <IconButton
                sx={{
                    color: `tomato`,
                    borderRadius: `50px`,
                    border: `1px solid tomato`
                }}
                className={classes.root}
                onClick={toggleDrawer('left', true)}
                size="large">
                <MenuIcon fontSize={"small"} />
            </IconButton>
            <SwipeableDrawer
                anchor={'left'}
                sx={{zIndex: 2000}}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}>
                {list('left')}
            </SwipeableDrawer>
        </div>
    );
}

function logout() {}

function loggedIn(){}

const NavigationButtons = ({isLoggedIn, drawerMenuProps}) => (
        <List>
        {
            drawerMenuProps.map(item => {
                const TheIcon = item.componentIcon
                return item.isAuth && (
                <div key={item.id}>
                {item.checkAuth ? 
                <ListItem
                    button
                    onClick={ isLoggedIn ? logout() : loggedIn() }
                    activeStyle={{ color: "#000", backgroundColor: `#f0ecec`}}>
                <ListItemIcon>
                    <TheIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary={item.nameCategory} />
                </ListItem>
                :
                <ListItem
                    button
                    component={item.slug !== "" ? Link: "a"}
                    {...(item.callPhone && { href: item.href })} // ???
                    to={item.slug} 
                    activeStyle={{ color: "#000", backgroundColor: `#f0ecec`}}>
                <ListItemIcon>
                    <TheIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary={item.nameCategory} />
                </ListItem>

                }

                <Divider/>
                </div>
                )
            })
        }
        </List>
)

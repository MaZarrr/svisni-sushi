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
import Icon from "@material-ui/core/Icon";
import RoomIcon from "@material-ui/icons/Room";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import WorkIcon from '@material-ui/icons/Work';
import {SwipeableDrawer} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: 36,
        color: `tomato`,
        borderRadius: `50px`,
        border: `1px solid tomato`,
        [theme.breakpoints.up('769')]: {
            display: 'none',
            margin: 0
        },
    },
}));

export default function TemporaryDrawer({image: ImageLogo}) {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <div style={{background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,124,124,1) 100%)`, width: `100%`, height: 100}}>
                <div style={{maxWidth: 75, height: 70, margin: `0 auto 0 auto`, paddingTop: 15 }}>
                    <ImageLogo />
                </div>
            </div>
            <List>
                <ListItem button component={Link} to="/sale"  activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon>
                        <Icon className="fa fa-percent" style={{ marginLeft: `3px`}} color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Акции" />
                </ListItem>
                <ListItem button component={Link} to="/adres-i-kontakty" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><RoomIcon color="primary"/></ListItemIcon>
                    <ListItemText primary="Адрес" />
                </ListItem>
                <ListItem button component={Link} to="/dostavka-i-oplata" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><LocalTaxiIcon color="action"/></ListItemIcon>
                    <ListItemText primary="Доставка" />
                </ListItem>
                <Divider/>
                <ListItem button component={Link} to="/vacancy" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><WorkIcon color="primary"/></ListItemIcon>
                    <ListItemText primary="Вакансии" />
                </ListItem>
                <Divider/>
                <ListItem button component={"a"} href="tel:+79040949222" >
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary="Позвоните нам" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.menuButton}>
                <React.Fragment key={'left'}>
                    <IconButton onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </React.Fragment>
        </div>
    );
}
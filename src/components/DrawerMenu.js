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
import Divider from '@material-ui/core/Divider';
import WorkIcon from '@material-ui/icons/Work';
import {SwipeableDrawer} from "@material-ui/core";
import GatsbyImage from "gatsby-image";

const useStyles = makeStyles(theme => ({
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
    },
    socialContent: {
        display: `flex`,
        justifyContent: `space-around`,
        width: `75%`,
        margin: `40px auto 0 auto`
    }
}));

export default function TemporaryDrawer({ image }) {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
// linear-gradient(90deg, #c9f520 0%, #aeff31 100%)
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {[classes.fullList]: anchor === 'top' || anchor === 'bottom'})}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>

            <div style={{background: `red`, width: `100%`, height: 120}}>
                <div style={{maxWidth: 90, height: 90, margin: `0 auto 0 auto`, paddingTop: 15 }}>
                    <GatsbyImage fixed={image.fixed} alt={"логотип свистни суши"}/>
                </div>
            </div>
            <List style={{margin: 0, padding: 0}}>
                <ListItem button component={Link} to="/sale"  activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon>
                        <Icon className="fa fa-percent" style={{  marginLeft: `5px`}} color="action" />
                    </ListItemIcon>
                    <ListItemText primary="Акции" />
                </ListItem>
                <Divider/>
                <ListItem button component={Link} to="/adres-i-kontakty" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><RoomIcon color={"action"} style={{maxWidth: 30}}/></ListItemIcon>
                    <ListItemText primary="Адрес" />
                </ListItem>
                <Divider/>
                <ListItem button component={Link} to="/dostavka-i-oplata" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><LocalTaxiIcon color={"action"}/></ListItemIcon>
                    <ListItemText primary="Доставка" />
                </ListItem>
                <Divider/>
                <ListItem button component={Link} to="/vacancy" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`}}>
                    <ListItemIcon><WorkIcon color={"action"}/></ListItemIcon>
                    <ListItemText primary="Вакансии" />
                </ListItem>
                <Divider/>
                <ListItem button component={"a"} href="tel:+79040949222" >
                    <ListItemIcon><PhoneIcon color={"action"}/></ListItemIcon>
                    <ListItemText primary="Позвоните нам" />
                </ListItem>
                <Divider/>
            </List>
            <div className={classes.socialContent}>
                <div>
                    <a href="https://ok.ru/group/55132913991911" aria-label="odnoklassniki"><i className="fa fa-2x fa-odnoklassniki-square"></i></a>
                </div>
                <div>
                    <a href="https://vk.com/sushi_urazovo" aria-label="vk"><i className="fa fa-2x fa-vk text-gradient-dark"></i></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/svisni_sushi/" aria-label="instagram"><i className="fa fa-2x fa-instagram text-gradient-dark"></i></a>
                </div>
            </div>
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
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </React.Fragment>
    );
}
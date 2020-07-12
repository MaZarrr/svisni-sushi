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
        marginRight: 36,
        color: `tomato`,
        borderRadius: `50px`,
        border: `1px solid tomato`
    }
}));

export default function TemporaryDrawer({image}) {
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
            className={clsx(classes.list, {[classes.fullList]: anchor === 'top' || anchor === 'bottom'})}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>

            <div style={{background: `linear-gradient(90deg, #FF6D4C 0%, #FF6D71 100%)`, width: `100%`, height: 120}}>
                <div style={{maxWidth: 90, height: 90, margin: `0 auto 0 auto`, paddingTop: 15 }}>
                    <GatsbyImage fixed={image.fixed} alt={"аватар свисни бар"}/>
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
            <div className="d-flex justify-content-around w-75 ml-auto mr-auto mt-5">
                <div>
                    <a className="btn btn-sm btn-outline-warning rounded-pill" href="https://ok.ru/group/55132913991911"><i className="fa fa-2x fa-odnoklassniki-square" aria-hidden="true"></i></a>
                </div>
                <div>
                    <a className="btn btn-sm btn-outline-warning rounded-pill" href="https://vk.com/sushi_urazovo"><i className="fa fa-2x fa-vk text-gradient-dark" aria-hidden="true"></i></a>
                </div>
                <div>
                    <a className="btn btn-sm btn-outline-warning rounded-pill" href="https://www.instagram.com/svisni_sushi/"><i className="fa fa-2x fa-instagram text-gradient-dark" aria-hidden="true"></i></a>
                </div>
            </div>
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
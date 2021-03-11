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
import { SwipeableDrawer, Typography } from "@material-ui/core"
import { StaticImage } from "gatsby-plugin-image";

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
    },
    socialContent: {
        display: `flex`,
        flexDirection: "column",
        padding: `0 0 0 10px`,
        width: `95%`,
        margin: `30px auto 0 auto`
    }
}));

export default function TemporaryDrawer() {
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

            <div style={{background: `red`, width: `100%`, paddingBottom: 15}}>
                <div style={{maxWidth: 90, height: 90, margin: `0 auto 0 auto`, paddingTop: 15 }}>
                    <StaticImage loading={"eager"} src="../images/logosvisni.png" alt={"Свистни суши в Уразово"}/>
                </div>
                <Typography style={{color: `white`, fontWeight: 600, textAlign: `center`, marginTop: 20}} variant={'subtitle1'}>Уразово</Typography>
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
                    <a href="https://ok.ru/group/55132913991911" aria-label="odnoklassniki">Мы в одноклассниках</a>
                </div>
                <div style={{padding: `10px 0`}}>
                    <a href="https://vk.com/sushi_urazovo" aria-label="vk">Мы в вконтакте</a>
                </div>
                <div>
                    <a href="https://www.instagram.com/svisni_sushi/" aria-label="instagram">Мы в инстаграм</a>
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
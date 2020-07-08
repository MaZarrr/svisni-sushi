import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
}))

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({left: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
            onKeyDown={toggleDrawer(anchor, false)}
        >
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
                <ListItem>
                    <Button style={{margin: `8px 0 8px 0 `}} variant="contained" color="secondary">
                        <a style={{color: `white`, fontSize: 14}} href="tel:+79040949222">Позвонить</ a>
                    </Button>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.menuButton}>
                <React.Fragment key={'left'}>
                    <IconButton onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                        {/*меню*/}
                    </IconButton>
                    <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list('left')}
                    </Drawer>
                </React.Fragment>
        </div>
    );
}
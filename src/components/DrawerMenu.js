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

    // const data = useStaticQuery(graphql `
    //     {
    //         allContentfulIconMenuLeftPanel(sort: {fields: deck}) {
    //             edges {
    //                 node {
    //                     id
    //                     name
    //                     slug
    //                     image {
    //                         fluid(maxWidth: 50) {
    //                             ...GatsbyContentfulFluid
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `)

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
                    backgroundColor: `#f0ecec`,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}>
                    <ListItemIcon>
                        <Icon className="fa fa-percent" style={{ marginLeft: `3px`}} color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Акции" />
                </ListItem>
                <ListItem button component={Link} to="/adres-i-kontakty" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                }}>
                    <ListItemIcon><RoomIcon color="primary"/></ListItemIcon>
                    <ListItemText primary="Адрес" />
                </ListItem>
                <ListItem button component={Link} to="/dostavka-i-oplata" activeStyle={{ color: "#000",
                    backgroundColor: `#f0ecec`,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                }}>
                    <ListItemIcon><LocalTaxiIcon color="action"/></ListItemIcon>
                    <ListItemText primary="Доставка" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.menuButton}>
                <React.Fragment key={'left'}>
                    <IconButton size='small' onClick={toggleDrawer('left', true)}>
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
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import Hidden from "@mui/material/Hidden";
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    ulList: {
        backgroundColor: `#f9f9f9`,
        display: `flex`,
        borderRadius: `30px`,
        padding: 0,
        fontWeight: 600,
        cursor: `pointer`,
        listStyle: `none`,
        transition: `background-color 0.1s ease-in-out`,
        [theme.breakpoints.down('600')]: {
            display: `block`,
        }
    },
    active: {
        backgroundColor: `#282828`,
        padding: `5px 15px`,
        marginRight: `8px`,
        marginTop: `7px`,
        color: `#fff`,
        width: '95%',
        borderRadius: `30px`,
        '&:hover': {
            backgroundColor: `#282828`,
        }},

        activePc: {
            backgroundColor: `#282828`,
            padding: `5px 15px`,
            marginRight: `8px`,
            marginTop: `7px`,
            color: `#fff`,
            borderRadius: `30px`,
            '&:hover': {
                backgroundColor: `#282828`,
            }},
    nonactiveCategory: {
        border: `1px solid lightgray`,
        marginTop: `7px`,
        padding: `5px 15px`,
        marginRight: `8px`,
        borderRadius: `30px`
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
    const [activeTxt, setActiveTxt] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleChange = (active) => {
        setActiveTxt(active);
        onClickCategory(active);
        handleExpandClick()
    };

    return (
        <div>
            <ul className={classes.ulList} role="listbox">
                <Hidden smUp>
                <li
                    role="option" aria-selected={"true"}
                    onKeyPress={handleChange}
                    className={classes.active}
                    onClick={() => handleChange(activeCategory)}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant={"body2"}>
                        {activeCategory === null ? "Все" : activeTxt}
                    </Typography>
                    <IconButton
                        size={"small"}
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon style={{color: `white`}} />
                    </IconButton>
                    </div>
                </li>
                <Collapse in={expanded} timeout="auto">
                <li
                    role="option" aria-selected={"true"}
                    onKeyPress={handleChange}
                    className={activeCategory === null ? classes.active : classes.nonactiveCategory}
                    onClick={() => handleChange(null)}>
                    <Typography variant={"body2"}>
                        Все
                    </Typography>
                </li>
                {items &&
                items.map((name, index) => (
                    <li
                        key={`${name}_${index}`}    
                        role="option" aria-selected={"true"}
                        onKeyPress={handleChange}
                        value={name}
                        className={activeCategory === name ? classes.active : classes.nonactiveCategory}
                        onClick={() => handleChange(name)}>
                        <Typography variant={"body2"}>
                            {name}
                        </Typography>
                    </li>
                ))}
                </Collapse>
                </Hidden>
                <Hidden mdDown>
                    <li
                        role="option" aria-selected={"true"}
                        onKeyPress={onClickCategory}
                        className={activeCategory === null ? classes.activePc : classes.nonactiveCategory}
                        onClick={() => onClickCategory(null)}>
                        <Typography>
                            Все
                        </Typography>
                    </li>
                    {items &&
                    items.map((name, index) => (
                        <li
                            role="option" aria-selected={"true"}
                            onKeyPress={onClickCategory}
                            className={activeCategory === name ? classes.activePc : classes.nonactiveCategory}
                            onClick={() => onClickCategory(name)}
                            key={`${name}_${index}`}>
                            <Typography>
                                {name}
                            </Typography>
                        </li>
                    ))}
                </Hidden>
            </ul>
        </div>
    );
});
Categories.propTypes = {
    // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";
import '../components/sass/filterStyle.css'
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)'
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
        <div className="categories">
            <ul role="listbox">
                <Hidden smUp>
                <MenuItem
                    role="option" aria-selected={"true"}
                    onKeyPress={handleChange}
                    className={'active'}
                    onClick={() => handleChange(activeCategory)}>
                    <Typography variant={"subtitle2"}>
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
                </MenuItem>
                <Collapse in={expanded} timeout="auto">
                <li
                    role="option" aria-selected={"true"}
                    onKeyPress={handleChange}
                    className={activeCategory === null ? 'active' : 'nonactive_category'}
                    onClick={() => handleChange(null)}>
                    <Typography variant={"subtitle2"}>
                        Все
                    </Typography>
                </li>
                {items &&
                items.map((name, index) => (
                    <li
                        role="option" aria-selected={"true"}
                        onKeyPress={handleChange}
                        value={name}
                        className={activeCategory === name ? 'active' : 'nonactive_category'}
                        onClick={() => handleChange(name)}
                        key={`${name}_${index}`}>
                        <Typography variant={"subtitle2"}>
                            {name}
                        </Typography>
                    </li>
                ))}
                </Collapse>
                </Hidden>
                <Hidden xsDown>
                    <li
                        role="option" aria-selected={"true"}
                        onKeyPress={onClickCategory}
                        className={activeCategory === null ? 'active' : 'nonactive_category'}
                        onClick={() => onClickCategory(null)}>
                        <Typography variant={"subtitle2"}>
                            Все
                        </Typography>
                    </li>
                    {items &&
                    items.map((name, index) => (
                        <li
                            role="option" aria-selected={"true"}
                            onKeyPress={onClickCategory}
                            className={activeCategory === name ? 'active' : 'nonactive_category'}
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
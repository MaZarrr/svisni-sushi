import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";
import '../components/sass/filterStyle.css'

const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
    return (
        <div className="categories">
            <ul role="listbox">
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
                        <Typography variant={"subtitle2"}>
                            {name}
                        </Typography>
                    </li>
                ))}
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
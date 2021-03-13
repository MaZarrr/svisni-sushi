import React, { memo, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import loadable from "@loadable/component";
import MenuCategory from "./indexContent/MenuCategory";

const SelectionContentMobile = loadable(() => import("./indexContent/SelectionContentMobile"));
const KomboContent = loadable(() => import("./indexContent/KomboContent"));
const SelectionContent = loadable(() => import("./indexContent/SelectionContent"));
const KomboMobileContent = loadable(() => import("./indexContent/KomboMobileContent"));


const CardIndex = memo(({ addedCart, indexProduct, indexMenu }) => {
    const classes = useStyle();
    const [menu,] = useState(indexMenu)
    const [product,] = useState(indexProduct)
    return <>
        <div className={classes.root}>
            {/*Меню выбор*/}
            <Hidden smUp>
                <Grid container style={{marginBottom: 20}}>
                    <MenuCategory menu={menu} />
                </Grid>
            </Hidden>
        </div>

        <Typography className={classes.titleIndex}
                    variant={"h2"}>Комбо из пиццы суши роллов</Typography>
        {/*Карусель комбо телефон*/}
        <Hidden smUp>
            <KomboMobileContent product={product[1]} />
        {/* Новинки */}
            <Typography className={classes.titleIndex} variant={"h2"}>
                Блюда которые понравятся каждому</Typography>
            <SelectionContentMobile addedCart={addedCart} indexProduct={indexProduct[0]} product={product[0]} />
        </Hidden>

        {/*Комбо компьютер*/}
        {/* Новинки компьютер */}
        <Hidden xsDown>
            <Grid container
                  justify={"space-between"}
                  style={{width: `100%`, marginBottom: 50}}>
                {/*Комбо компьютер*/}
                <KomboContent product={product[1]} />
                {/* Новинки компьютер  */}
                <SelectionContent product={product[0]} addedCart={addedCart} indexProduct={indexProduct} />
            </Grid>
        </Hidden>
    </>;

});
export default CardIndex

const useStyle = makeStyles(theme => ({
    root: {
        margin: `0 auto`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: "baseline",
        borderRadius: `3px`
    },
    titleIndex: {
        fontSize: '28px',
        fontWeight: `bold`,
        width: `100%`,
        paddingBottom: 20,
        [theme.breakpoints.down('600')]: {
            fontSize: '22px',
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 0,
        },
    }
}));
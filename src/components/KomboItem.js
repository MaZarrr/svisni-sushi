import React, {useState} from "react"
import Seo from "./seo"
import Button from '@mui/material/Button';
import clsx from "clsx";
import { Grid } from "@mui/material";
import { GatsbyImage } from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import { pluck, sum, compose } from "ramda";
import Hidden from "@mui/material/Hidden";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {addedCart} from "../reducers/shopping-cart";
import { connect } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import SwipeableViews from 'react-swipeable-views';
import Modal from "@mui/material/Modal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const styles = {
    root: {
        padding: '0 30px',
        maxWidth: `100%`
    },
    slideContainer: {
        padding: '0 20px',
    }
};


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const KomboItem = React.memo(( { id, name, description, image, addedCart, price, slug, edit, products } ) => {
    // const KomboItem = React.memo(( { id, name, description, addedCart, image, price, slug, edit, products } ) => {
    const [activeItem, setActiveItem] = useState({nameItem: false});
    const [activeItems, setActiveItems] = useState({nameItem: false});
    const [activeType, setActiveType] = useState('');
    const [items, switchItems] = useState([]);
    const [productSostav, setProduct] = useState([]);
    const [activeIndexSostav, setActiveIndexSosvav] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [{vertical, horizontal},] = useState({
        vertical: 'bottom',
        horizontal: 'center',
      });

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const classes = useStyleKombo();
    const handleClickAlert = () => {
        setOpenAlert(true);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const onActiveItem = (id, type, idx) => {
        setActiveItem({[id]: true});
        setActiveType(type);
        setActiveIndexSosvav(idx);
        handleToggle()
    };
    const onActiveItems = (id, item) => {
        const productInDefault = productSostav.find(el => el.id === id);

        setActiveItems({[id]: true});
        setActiveItemIndex(0);

        if(productInDefault === undefined) {
            const newProducts = [
                ...productSostav.slice(0, activeIndexSostav), // все элементы до нужного
                item,
                ...productSostav.slice(activeIndexSostav + 1), // все элементы после нужного
            ];
            setProduct(newProducts);
            handleToggle()
        } else {
            handleClickAlert();
        }
    };

    const addedProductKomboToBacket = () => {
        const descriptionKombo = pluck('fieldName')(productSostav).join(", ");
        return {
            id,
            name,
            description: descriptionKombo.toString(),
            price,
            edit,
            slug,
            count: 1,
            image
        }
    };
    const handleClose = () => {
        setActiveItemIndex(0);
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        setProduct(products.sostavDefault);
    }, [products.sostavDefault]);
    React.useEffect(() => {
        if(activeType === '') return;
        switchItems(products[activeType])
    },[activeItem, activeType, products, switchItems]);

    const priceSale = () => {
        return compose(
            sum,
            pluck('fieldPriceProduct')
        )(productSostav);
    };

    return <>
        <Seo title={`Комбо набор ${name}`}
             description={`Доставка комбо наборов в Валуйки. Комбо набор ${name}, цена ${price} рублей`} />
        <Typography
            variant="h1"
            sx={{
                fontWeight: 900,
                textTransform: `uppercase`,
                marginBottom: '6px',
                letterSpacing: `-1.6px`,
                marginLeft: '25px',
        }}>{name}</Typography>

        <div style={{width: `100%`}}>
        <div>
            <Typography style={{marginLeft: 30, padding: `0 10px 5px 0`}}
                        variant={"body1"}>{description}</Typography>
            <Hidden smDown>
                <div style={{marginLeft: 30}}>
                <Typography style={{
                    fontSize: 22,
                    fontWeight: 500,
                    padding: `10px 10px 0 0`}}
                    variant={"subtitle1"}>Состав</Typography>
                    <Typography style={{
                        fontSize: 16,
                        fontWeight: 500}}
                        variant={"subtitle2"}>Нажмите на блюдо</Typography>
                </div>
                    <Grid container style={{padding: `0 0 30px 30px`}}>
                        <Grid item xs={12} sm={5} style={{
                            background: `lightgrey`,
                            padding: `0 30px 30px 7px`,
                            borderRadius: 5 }}>
                            <div style={{
                                borderRadius: 5,
                                top: 150,
                                position: `sticky`}}>
                                { productSostav.map(({
                                        id,
                                        fieldName: name,
                                        fieldPriceProduct: price,
                                        fieldSlug: slug,
                                        fieldDescriptionProduct: description, 
                                        fieldWeight: weight,
                                        image: { gatsbyImageData }
                                    }, idx) => (
                                    <div aria-hidden={true} onKeyPress={onActiveItem} key={id}
                                         className={clsx(classes.defItem, {
                                             [classes.activeItem]: activeItem[id],
                                         })}
                                         onClick={() => onActiveItem(id, slug, idx)}>
                                       <div className={classes.sostavContainer}>
                                       <div>
                                        <GatsbyImage
                                            image={gatsbyImageData}
                                            style={{width: 100}}
                                            alt={name} />
                                        </div>
                                           <div style={{maxWidth: 400, marginLeft: 10}}>
                                            <Typography variant={"subtitle2"}>{name}</Typography>
                                            <Typography variant={"body2"}>{description}</Typography>
                                        </div>
                                       </div>
                                    </div>
                                ))}
                                <div className={classes.checkoutInfo}>
                                        <Typography variant={"body1"}>
                                            Стоимость:</Typography>
                                        <Typography style={{marginLeft: `auto`}} variant={"body1"}>
                                            <s style={{fontSize: 20, fontWeight: 600}}>{priceSale()}</s> {price} ₽</Typography>
                                </div>
                                <Button fullWidth={true}
                                        variant={"contained"}
                                        color={"primary"}
                                        onClick={() => addedCart({id, price, product: [addedProductKomboToBacket()]})}>
                                    Добавить в корзину</Button>
                            </div>
                        </Grid>

                        {/*Выбор товаров из предложенных компьютер*/}
                        <Grid item xs={12} sm={7}>
                            <Grid container justifyContent={"space-around"} style={{
                                borderRadius: 10,
                                position: `sticky`,
                                top: 150,
                                overflowY: `scroll`,
                                border: `1px solid lightgrey`,
                                margin: `0 auto` }}>
                                { activeType !== '' ? items.map(({
                                        id,
                                        fieldName: name,
                                        fieldPriceProduct: price,
                                        fieldSlug: slug,
                                        fieldDescriptionProduct: description, 
                                        fieldWeight: weight,
                                        image: {gatsbyImageData}
                                    }, idx) => (
                                    <Grid item md={4} lg={3} xl={2}
                                          role="button" tabIndex="0" aria-roledescription="attachment button"
                                          onKeyPress={onActiveItems} key={id}
                                          className={clsx(classes.defItemVibor, {
                                            [classes.activeItemPc]: activeItems[id]})}
                                            onClick={() => onActiveItems(id, { id, fieldDescriptionProduct: description,
                                                fieldName: name, image: {gatsbyImageData}, fieldSlug: activeType, fieldPriceProduct: price })}                                            style={{cursor: 'pointer', margin: 5, border: `1px solid lightgrey`}}>

                                        <GatsbyImage image={gatsbyImageData} alt={name} />
                                        <div>
                                            <Typography style={{textAlign: `center`}}
                                                         variant={"subtitle1"}>{name}</Typography>
                                            <Typography style={{textAlign: `center`}} variant={"subtitle2"}>
                                                {description}</Typography>
                                        </div>
                                    </Grid>
                                )) : <div><GatsbyImage image={image.gatsbyImageData} alt={name} /></div> }
                            </Grid>
                        </Grid>
                    </Grid>
            </Hidden>
        </div>

        {/*Карусель товаров телефон*/}
        <Hidden smUp>
            {/* active sostav product */}
            <Grid container style={{marginBottom: 50}}>
                <div style={{marginLeft: 30}}>
                    <Typography style={{
                        fontWeight: 500,
                        padding: `10px 10px 0 0`}}
                        variant={"subtitle1"}>Состав набора:</Typography>
                </div>
                { productSostav.map(({
                    id,
                    fieldName: name,
                    fieldPriceProduct: price,
                    fieldSlug: slug,
                    fieldDescriptionProduct: description, 
                    fieldWeight: weight,
                    image: {gatsbyImageData}
                }, idx) => (
                    <Grid key={id} item xs={12} style={{padding: 10}}>
                        <div role="button" tabIndex="0"
                             aria-roledescription="attachment button"
                             onKeyPress={onActiveItem}
                             className={classes.activeItemPhone}
                             onClick={() => onActiveItem(id, slug, idx)}>
                            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                <GatsbyImage
                                    image={gatsbyImageData}
                                    style={{width: `35%`, margin: `0`}}
                                    alt={name} />
                                <div style={{position: `absolute`, width: `60%`, right: 0, padding: `8px 2px 8px 3px`}}>
                                    <Typography style={{fontWeight: 600}} variant={"subtitle1"}>{name}</Typography>
                                    <Typography style={{lineHeight: 1.15, letterSpacing: -0.5}}
                                                variant={"body2"}>{description}</Typography>
                                </div>
                            </Grid>
                            <Button size={"small"} 
                            sx={{
                                backgroundColor: 'orange',
                                color: "#000",
                                margin: `10px 0 6px 0`,
                            }}
                            fullWidth className={classes.button} variant={"contained"}>
                                Поменять</Button>
                        </div>
                    </Grid>
                ))}

                <div style={{
                    border: `1px solid lightgrey`,
                    padding: `3px 3px 3px 25px`,
                    width: `90%`,
                    margin: `30px auto 0 auto`,
                    position: `sticky`,
                    backgroundColor: `white`,
                    opacity: `80%`,
                    bottom: 60 }}>
                    <Typography variant={"body1"}>
                        Стоимость:</Typography>
                    <Typography style={{marginLeft: `auto`}} variant={"body1"}>
                        <s style={{fontSize: 20, fontWeight: 600}}>{priceSale()}</s> {price} ₽</Typography>
                </div>
                <Button 
                        sx={{
                            position: "sticky",
                            bottom: 30,
                            backgroundColor: "#303032",
                            color: "white",
                            marginTop: 5,
                            marginBottom: 15,
                            width: '100%',
                            opacity: `93%`
                        }}
                        style={{margin: `0 auto 0 auto`, padding: 5, width: `90%`, }}
                        size={"small"}
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => addedCart({id, price, product: [addedProductKomboToBacket()]})}>
                        Добавить в корзину</Button>
            </Grid>

            {/*Modal carousel items phone*/}
            <Grid container>
                <Modal
                    open={open}
                    sx={{
                        color: '#fff',
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <div style={{width: `100%`, marginTop: `23%`}}>
                        <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}
                                        index={activeItemIndex}
                                        onChangeIndex={value => setActiveItemIndex(value)}>
                            { items.map(({
                                        id,
                                        fieldName: name,
                                        fieldPriceProduct: price,
                                        fieldSlug: slug,
                                        fieldDescriptionProduct: description, 
                                        fieldWeight: weight,
                                        image: {gatsbyImageData}
                                    }, idx) => (
                                <Card key={id} 
                                sx={{
                                    borderRadius: '5px',
                                    width: '260px',
                                    height: '420px',
                                    margin: 'auto',
                                    position: "relative",
                                    '@media screen and (max-width: 330px)': {
                                        width: '250px',
                                        height: '350px',
                                    }
                                }}>
                                    <CardMedia
                                        style={{padding: 8, display: `flex`, justifyContent: `center`}}
                                        title={name}>
                                        <Button 
                                        onClick={() => onActiveItems(id, { id, fieldDescriptionProduct: description,
                                            fieldName: name, image: {gatsbyImageData}, fieldSlug: activeType, fieldPriceProduct: price })}                                        sx={{
                                            maxWidth: '260px',
                                            '@media (max-width: 330px)': {
                                                maxWidth: '200px'
                                            }
                                        }}>
                                        <GatsbyImage
                                            image={gatsbyImageData}
                                            alt={name} />
                                        </Button>
                                    </CardMedia>
                                    <CardContent style={{padding: 5, height: '200px'}}>
                                        <Typography style={{fontSize: 14, fontWeight: `bold` }} variant={"subtitle1"}>{name}</Typography>
                                        <Typography
                                        sx={{
                                            fontSize: 13, 
                                            overflowY: `auto`,
                                            '@media (max-width: 330px)': {
                                                fontSize: 11,
                                            }
                                        }}
                                        variant={"subtitle2"}>{description}</Typography>
                                        <Button
                                            onClick={() => onActiveItems(id, { id, fieldDescriptionProduct: description,
                                            fieldName: name, image: {gatsbyImageData}, fieldSlug: activeType, fieldPriceProduct: price })}
                                          variant="contained"
                                          size={"small"}
                                          style={{backgroundColor: "orange",  position: 'absolute', bottom: `15px`}}>
                                            Выбрать
                                        </Button>
                                    </CardContent>

                                </Card>
                            ))}
                        </SwipeableViews>
                        <div style={{width: `100%`, textAlign: `center`}}>
                            <div>
                                <Typography style={{fontSize: 20}} variant={"caption"}>{activeItemIndex + 1} / {items.length}</Typography>
                            </div>
                            <div>
                                <CloseIcon fontSize="large" onClick={handleClose}/>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Grid>
        </Hidden>

        <Snackbar open={openAlert} autoHideDuration={2500} 
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        style={{bottom: 90}} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="info">
                   В составе такой товар есть, выберите другой.
                </Alert>
        </Snackbar>
        </div>
    </>;
});

const mapDispatchToProps = {
    addedCart,
};
export default connect(null, mapDispatchToProps)(KomboItem)

const useStyleKombo = makeStyles(theme => ({
    defItem: {
        cursor: 'pointer',
        margin: `10px 0 10px 0`,
        background: `white`,
        border: `1px solid lightgrey`,
        padding: 10,
        borderRadius: 5,

    },
    defItemVibor: {
        cursor: 'pointer',
        margin: `10px 0 10px 0`,
        background: `white`,
        border: `1px solid lightgrey`,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: 5,
        borderRadius: 5,
    },
    sostavContainer: {
      display: "flex",
        alignItems: "center"
    },
    activeItem: {
        cursor: 'pointer',
        background: `white`,
        padding: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        border: `1px solid lightgrey`,
        transition: `transform 0.3s`,
        position: "relative",
        margin: `10px auto 0 auto`,
        transform: `scale(1.05)`,
    },
    activeItemPhone: {
        cursor: 'pointer',
        background: `white`,
        padding: `8px 3px 3px 3px`,
        borderTop: `1px solid lightgrey`,
        transition: `transform 0.3s`,
        position: "relative",
    },
    checkoutInfo: {
        borderRadius: 5,
        border: `1px solid lightgrey`,
        padding: 9,
        backgroundColor: "white",
        opacity: `80%`,
        display: "flex",
        position: "sticky",
        bottom: 60
    },
    activeItemPc: {
        cursor: 'pointer',
        marginTop: 5,
        background: `white`,
        maxWidth: `80%`,
        padding: 5,
        borderRadius: 10,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .6)',
        transition: `transform 0.2s`,
        margin: `0 auto`,
        transform: `scale(1.03)`,
    },
    button: {
        backgroundColor: 'orange',
        padding: 5,
        margin: `10px 0 6px 0`,
    }
}));
import React, {useState} from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import clsx from "clsx";
import {Container, Grid} from "@material-ui/core";
import Img from "gatsby-image";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {pluck, sum, compose } from "ramda";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {addedCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = {
    root: {
        padding: '0 50px',
        maxWidth: `100%`
    },
    slideContainer: {
        padding: '0 20px',
    },
    img: {
        maxWidth: 350
    }
};

export const useStyleKombo = makeStyles(theme => ({
    defItem: {
        cursor: 'pointer', marginTop: 10, background: `white`,
        maxWidth: `75%`, border: `1px solid lightgrey`, padding: 10, borderRadius: 10,

    },
    activeItem: {
        cursor: 'pointer',
        background: `white`,
        maxWidth: `80%`,
        padding: 3,
        overflowY: `auto`,
        borderRadius: 10,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .6)',
        transition: `transform 0.3s`,
        margin: `10px auto 0 auto`,
        transform: `scale(1.01)`,
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    button: {
        backgroundColor: 'orange',
        padding: 5,
        marginBottom: 12,
    },
    titleClass: {
        fontFamily: `Oswald, cursive`,
        fontWeight: 800,
        marginTop: 80,
        textTransform: `uppercase`,
        fontSize: 34,
        marginLeft: 35,
        [theme.breakpoints.down('475')]: {
            fontSize: 26,
            marginTop: 40
        }
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const KomboItem = React.memo(( { id, name, description, addedCart, image, price, slug, edit, products } ) => {

    const [activeItem, setActiveItem] = React.useState({nameItem: false});
    const [activeItems, setActiveItems] = React.useState({nameItem: false});
    const [activeType, setActiveType] = React.useState('');
    const [items, switchItems] = React.useState([]);
    const [productSostav, setProduct] = React.useState([]);
    const [activeIndexSostav, setActiveIndexSosvav] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);

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
        const descriptionKombo = pluck("name")(productSostav).join(", ");
        return {
            id,
            name,
            description: descriptionKombo.toString(),
            price,
            edit,
            slug,
            count: 1,
            image: {fluid: image}
        }
    };

    const handleClose = () => {
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
            pluck('price')
        )(productSostav);
    };

    return (
        <>
            <SEO title={`Комбо набор ${name}`}
                 description={`Доставка комбо наборов в Валуйки. Комбо набор ${name}, цена ${price} рублей`}
                 pathname="/kombo"/>
            <h1 itemProp="name" className={classes.titleClass}>{name}</h1>

            <div style={{width: `100%`}}>
            <div>
                <Typography style={{marginLeft: 35, fontSize: 15, padding: `0 15px 5px 0`}}
                            variant={"body1"}>{description}</Typography>
                <Divider/>
                <Hidden xsDown>
                    <Container style={{paddingBottom: 50}}>
                        <Grid container style={{height: `20%`}}>
                            <Grid item xs={12} sm={5}>

                                <div style={{ overflowY: `scroll`, background: `lightgrey`,
                                    padding: `0 30px 30px 7px`, height: 450, borderRadius: 10}}>
                                    { productSostav.map((el, idx) => (
                                        <div aria-hidden={true} onKeyPress={onActiveItem} key={el.id}
                                             className={clsx(classes.defItem, {
                                                 [classes.activeItem]: activeItem[el.id],
                                             })}
                                             onClick={() => onActiveItem(el.id, el.__typename, idx)}>
                                            <Img style={{width: 100}} fluid={el.image.fluid} alt={el.name}/>
                                            <div style={{maxWidth: 200, marginLeft: 10}}>
                                                <Typography variant={"subtitle2"}>{el.name}</Typography>
                                                <Typography style={{fontSize: 14}} variant={"body2"}>{el.description}</Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{borderRadius: 10, border: `1px solid lightgrey`, padding: 9, marginTop: 20}}>
                                    <div className="d-flex mt-2" >
                                        <Typography style={{fontSize: 20}} variant={"body1"}>
                                            Стоимость:</Typography>
                                        <Typography style={{fontSize: 24}} className="ml-auto" variant={"body1"}>
                                            <s style={{fontSize: 22}}>{priceSale()} ₽</s> {price} ₽</Typography>
                                    </div>
                                    <Button className="mt-3" variant={"contained"}
                                            color={"primary"}
                                            onClick={() => addedCart({id, price,
                                                product: [addedProductKomboToBacket()]}
                                            )}>
                                        В корзину</Button>
                                </div>
                            </Grid>

                            {/*Выбор товаров из предложенных компьютер*/}
                            <Grid item xs={12} sm={7}>
                                <Grid container justify={"space-around"} style={{
                                    borderRadius: 10,
                                    height: 450,
                                    position: `sticky`,
                                    top: 150,
                                    overflowY: `scroll`,
                                    border: `1px solid lightgrey`,
                                    margin: `0 auto`}}>
                                    { activeType !== '' ? items.map((el) => (
                                        <Grid item xs={2}
                                              role="button" tabIndex="0" aria-roledescription="attachment button"
                                              onKeyPress={onActiveItems} key={el.id}  className={clsx(classes.defItem, {
                                            [classes.activeItemPc]: activeItems[el.id]})}
                                              onClick={() => onActiveItems(el.id, { id: el.id, description: el.description,
                                                  name: el.name, image: el.image, __typename: activeType, price: el.price })}
                                              style={{ width: `120px`, cursor: 'pointer',
                                                  margin: 7, border: `1px solid lightgrey`,
                                                  padding: 6, borderRadius: 10, height: 180 }}>
                                            <Img style={{width: 100}} fluid={el.image.fluid} alt={el.name}/>
                                            <div>
                                                <Typography  style={{fontSize: 14, textAlign: `center`}} variant={"subtitle1"}>{el.name}</Typography>
                                            </div>
                                        </Grid>
                                    )) : <div style={{width: `460px`}}><Img fluid={image} alt={name}/></div> }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Hidden>
            </div>

            {/*Карусель товаров телефон*/}
            <Hidden smUp>
                {/* active sostav product */}
                <Grid container style={{marginBottom: 140}}>
                    { productSostav.map((el, idx) => (
                        <Grid key={el.id} item xs={6}>
                            <div role="button" tabIndex="0"
                                 aria-roledescription="attachment button"
                                 onKeyPress={onActiveItem}
                                 className={classes.activeItem}
                                 onClick={() => onActiveItem(el.id, el.__typename, idx)}>
                                <Img style={{width: `90%`, margin: `0 auto`}} fluid={el.image.fluid} alt={el.name}/>
                                <div>
                                    <Typography style={{fontSize: 14, textAlign: `center`}} variant={"subtitle1"}>{el.name}</Typography>
                                    <div style={{display: `flex`, justifyContent: `center`}}>
                                        <Button className={classes.button} variant={"contained"}>
                                            Поменять</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}

                    <div style={{borderRadius: 10,
                        border: `1px solid lightgrey`,
                        padding: `6px 6px 6px 50px`,
                        width: `100%`,
                        position: `fixed`,
                        backgroundColor: `white`,
                        bottom: 0}}>
                        <div style={{marginTop: 10}}>
                            <div>
                                <Typography style={{fontSize: 20}} variant={"body1"}>
                                    Стоимость:</Typography>
                            </div>
                            <div>
                                <Typography style={{fontSize: 24}} className="ml-auto" variant={"body1"}> <s style={{fontSize: 22}}>{priceSale()} ₽</s> {price} ₽</Typography>
                            </div>
                        </div>
                        <Button className="mb-1" variant={"contained"}
                                color={"primary"}
                                onClick={() => addedCart({id, price, product: [addedProductKomboToBacket()]})}>
                            В корзину</Button>
                    </div>
                </Grid>

                {/*Modal carousel items phone*/}
                <Grid container>
                    <Modal
                        open={open}
                        className={classes.backdrop}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={{width: `100%`, marginTop: `39%`}}>
                            <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}
                                            index={activeItemIndex}
                                            onChangeIndex={value => setActiveItemIndex(value)}>
                                { items.map((el) => (
                                    <Card key={el.id} style={{borderRadius: 10, height: 330, maxWidth: 220}}>
                                        <CardMedia
                                            style={{padding: 8}}
                                            title={el.name}>
                                            <Img style={{maxWidth: 150, margin: `0 auto`}} fluid={el.image.fluid} alt={el.name} />
                                        </CardMedia>
                                        <CardContent style={{padding: 5}}>
                                            <Typography style={{fontSize: 14, textAlign: `center`}} variant={"h6"}>{el.name}</Typography>
                                            <Typography style={{height: 70, fontSize: 13, overflowY: `auto`, textAlign: `center`}}
                                                        variant={"subtitle1"}>{el.description}</Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <Button
                                                onClick={() => onActiveItems(el.id, { id: el.id, description: el.description,
                                                    name: el.name, image: el.image, __typename: activeType, price: el.price })}
                                                variant="contained"
                                                style={{backgroundColor: "orange"}}>
                                                Выбрать
                                            </Button>
                                        </CardActions>

                                    </Card>
                                ))}
                            </SwipeableViews>
                            <div style={{width: `100%`, margin: `10px 0 0 0`, textAlign: `center`}}>
                                <div>
                                    <Typography style={{fontSize: 20}} variant={"caption"}>{activeItemIndex} / {items.length}</Typography>
                                </div>
                                <div>
                                    <CloseIcon fontSize="large" onClick={handleClose}/>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Grid>
            </Hidden>

                <Snackbar open={openAlert} autoHideDuration={2500} style={{bottom: 90}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error">
                       В составе такой товар есть, выберите другой.
                    </Alert>
                </Snackbar>

            </div>

        </>
    );
});

const mapDispatchToProps = {
    addedCart,
};
export default connect(null, mapDispatchToProps)(KomboItem)
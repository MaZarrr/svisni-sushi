import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import clsx from "clsx";
import ButtonBack from "./common/ButtonBackSet";
import {Container, Grid} from "@material-ui/core";
import Img from "gatsby-image";
import uniqid from 'uniqid'
import {StylingInfo} from "./common/style";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {addedCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import { pluck } from "ramda";
// import IconButton from "@material-ui/core/IconButton";

export const useStyleKombo = makeStyles(theme => ({
    defItem: {
        cursor: 'pointer', marginTop: 10, background: `white`,
        maxWidth: `75%`, border: `1px solid lightgrey`, padding: 10, borderRadius: 10,

    },
    activeItem: {
        cursor: 'pointer', marginTop: 10, background: `white`,
        maxWidth: `75%`,  padding: 10, borderRadius: 10, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .6)',
        transition: `transform 0.2s`,
        transform: `scale(1.02)`
    }
}));

const KomboItem = React.memo(( {id, name, description, image, price, slug, weight, edit, products, addedToCart} ) => {
    const [activeItem, setActiveItem] = React.useState({nameItem: false});
    const [activeItems, setActiveItems] = React.useState({nameItem: false});
    const [activeType, setActiveType] = React.useState('');
    const [items, switchItems] = React.useState([]);
    const [product, setProduct] = React.useState([]);
    const [activeIndexSostav, setActiveIndexSosvav] = React.useState(0);
    const classes = useStyleKombo();

    const onActiveItem = (id, type, idx) => {
        setActiveItem({[id]: true});
        setActiveType(type);
        setActiveIndexSosvav(idx);
    };
    const onActiveItems = (id, item) => {
        setActiveItems({[id]: true});
            const newProducts = [
                ...product.slice(0, activeIndexSostav), // все элементы до нужного
                {...item, id: uniqid()},
                ...product.slice(activeIndexSostav + 1), // все элементы после нужного
            ];
            setProduct(newProducts)
    };

    const addedProductKomboToBacket = () => {
        const descriptionKombo = pluck("name")(product).join(", ");

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

    React.useEffect(() => {
        setProduct(products.sostavDefault)
    }, []);
    React.useEffect(() => {
        if(activeType === '') return;

        // if(isEmpty(items)) {
            switchItems(products[activeType])
        //     console.log("true")
        // } else {
        //     console.log("false")
        //   const ss = switchItems((items) => items[activeType])
        //     console.log(ss)
        // }

    },[activeItem, activeType]);

    return (
        <>
            <SEO title={`Комбо набор ${name}`}
                 description={`Доставка комбо наборов в Валуйки. Комбо набор ${name}, цена ${price} рублей`}
                 pathname="/kombo"/>
            <StylingInfo>
                <Container style={{height: `700px`, paddingBottom: 100}}>
                    <h1 itemProp="name" style={{fontFamily: `Oswald, cursive`,
                        fontWeight: 600, fontSize: 39}}>{name}</h1>
                    <div style={{position: "sticky", top: 120}}>
                    <Typography variant={"body1"}>{description}</Typography>

                    <Grid container style={{height: `20%`}}>
                    <Grid item xs={12} sm={5}>
                        <ButtonBack back="/kombo" />

                        <div style={{ overflowY: `scroll`, background: `lightgrey`, height: `460px`,
                            padding: `0 30px 30px 7px`, borderRadius: 10}}>
                        {product.map((el, idx) => (
                            <div key={el.id}
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
                        <Typography className="mt-2" variant={"body1"}><strong>Цена комбо</strong> {price} ₽</Typography>
                        <Button variant={"contained"}
                                color={"primary"}
                            onClick={() => addedToCart({id, price,
                            product: [addedProductKomboToBacket()]}
                        )}>
                            В корзину</Button>
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <Grid className="d-flex flex-wrap justify-content-around" style={{overflowY: `scroll`, height: `460px`, borderRadius: 10, border: `1px solid lightgrey`}}>
                        { activeType !== '' ? items.map((el) => (
                            <div key={el.id}  className={clsx(classes.defItem, {
                                [classes.activeItem]: activeItems[el.id],
                            })} onClick={() => onActiveItems(el.id, { id: el.id, description: el.description,
                                name: el.name, image: el.image, __typename: activeType })}
                                 style={{ width: `120px`, cursor: 'pointer',
                                    margin: 7, border: `1px solid lightgrey`,
                                    padding: 6, borderRadius: 10, height: 180 }}>
                                    <Img style={{width: 100}} fluid={el.image.fluid} alt={el.name}/>
                                <div>
                                    <Typography  style={{fontSize: 14, textAlign: `center`}} variant={"subtitle1"}>{el.name}</Typography>
                                </div>
                            </div>

                        )) : <div style={{width: `460px`}}><Img fluid={image} alt={name}/></div> }
                        </Grid>
                    </Grid>

                    </Grid>
                    </div>

                </Container>
            </StylingInfo>
        </>
    );
});

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
});

export default connect(null, mapDispatchToProps)(KomboItem)



// setActiveItem({[id]: true});
// const itemSostav = product.find((el) => el.id === item.id)
// console.log(itemSostav)
// const checkInSostav = itemSostav.id === item.id;
// console.log(checkInSostav)
// if(checkInSostav) {
//     const newProducts = [
//         ...product.slice(0, activeIndexSostav), // все элементы до нужного
//         {...item, id: uniqid()},
//         ...product.slice(activeIndexSostav + 1), // все элементы после нужного
//     ];
//     setProduct(newProducts)
//
// } else {
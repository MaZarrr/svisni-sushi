import React from "react"
import SEO from "./seo"
import Button from '@material-ui/core/Button';
import clsx from "clsx";
import ButtonBack from "./common/ButtonBackSet";
import {Container, Grid} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Img from "gatsby-image";
import {StylingInfo} from "./common/style";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

export const useStyleKombo = makeStyles(theme => ({
    defItem: {
        cursor: 'pointer', marginTop: 10, background: `white`,
        maxWidth: `75%`, border: `1px solid lightgrey`, padding: 8, borderRadius: 10,
    },
    activeItem: {
        cursor: 'pointer', marginTop: 10, background: `white`,
        maxWidth: `75%`, border: `2px solid lightgreen`, padding: `8px 8px 10px 25px`, borderRadius: 10, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .6)'
    }
}));

const switchItemsType = (type, items) => {
    console.log(type, items)
    switch (type) {
        case 'ContentfulProductSlognyeRolly':
            return items[type]
        case 'ContentfulProductWok':
            return items[type]
        case 'ContentfulProductPizza':
            return items[type]

        default:
            return []
    }

};

const KomboItem = ( {name, description, image, price, weight, edit, products, sostavDefault, productsKomboRolls, productsKomboWok, productsKomboNapitki, productsComboPizza} ) => {
    // console.log(sostavDefault)
    const [activeItem, setActiveItem] = React.useState({nameItem: false});
    const [activeItems, setActiveItems] = React.useState({nameItem: false});
    const [activeType, setActiveType] = React.useState('');

    const classes = useStyleKombo();
    const onActiveItem = (id, type) => {
        setActiveItem({[id]: true});
        setActiveType(type)
        console.log(type)
    };
    const onActiveItems = (id) => setActiveItems({[id]: true});

    const items = switchItemsType(activeType, products);
    console.log(items);
    return (
        <>
            <SEO title={`Комбо набор ${name}`}
                 description={`Доставка комбо наборов в Валуйки. Комбо набор ${name}, цена ${price} рублей`}
                 pathname="/kombo"/>
            <StylingInfo>
                <Container style={{paddingBottom: 100, position: "relative"}}>
                    <h1 itemProp="name" style={{fontFamily: `Oswald, cursive`,
                        fontWeight: 600, fontSize: 39}}>Комбо {name}</h1>
                    {/*<Divider/>*/}

                    <Grid container style={{position: `sticky`, top: `170px`}}>
                    <Grid item xs={12} sm={6}>
                        {/*<Grid item xs={12} sm={6}>*/}
                        {/*    <Img style={{maxWidth: 200}} itemProp="image" fluid={image}/>*/}
                        {/*</Grid>*/}
                        <ButtonBack back="/kombo" />

                        <div style={{ overflowY: `scroll`, background: `lightgrey`, height: `450px`,
                            padding: `30px 30px 30px 7px`, borderRadius: `50% 20% / 10% 40%`}}>
                        {products.sostavDefault.map((el) => (
                            <div key={el.id}
                                 className={clsx(classes.defItem, {
                                     [classes.activeItem]: activeItem[el.id],
                                 })}
                                 onClick={() => onActiveItem(el.id, el.__typename)}>
                                <Img style={{width: 100}} fluid={el.image.fluid} alt={el.name}/>
                                <div style={{maxWidth: 200, marginLeft: 10}}>
                                    <Typography variant={"subtitle2"}>{el.name}</Typography>
                                    <Typography style={{fontSize: 14}} variant={"body2"}>{el.description}</Typography>
                                </div>
                            </div>
                        ))}
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid className="d-flex flex-wrap justify-content-around" style={{overflowY: `scroll`, maxHeight: `450px`, borderRadius: 10, border: `1px solid lightgrey`}}>
                        {items.map((el) => (
                            <div key={el.id}  className={clsx(classes.defItem, {
                                [classes.activeItem]: activeItems[el.id],
                            })} onClick={() => onActiveItems(el.id)} style={{width: `120px`, cursor: 'pointer', margin: 7, border: `1px solid lightgrey`,
                                padding: 6, borderRadius: 10, }}>
                                    <Img style={{width: 100}} fluid={el.image.fluid} alt={el.name}/>
                                <div>
                                    <Typography  style={{fontSize: 14, textAlign: `center`}} variant={"subtitle1"}>{el.name}</Typography>
                                </div>
                            </div>

                        ))}
                        </Grid>
                    </Grid>

                    </Grid>
                </Container>
            </StylingInfo>

        </>
    );
};

export default KomboItem
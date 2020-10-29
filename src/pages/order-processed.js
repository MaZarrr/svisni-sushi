import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginTop: `30px`,
        marginBottom: `30px`,
        marginLeft: `80%`,
        [theme.breakpoints.down("md")]: {
            marginLeft: `70%`,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: `40%`,
        }
    }
    }));
const StyledTableCell = withStyles((theme) => ({
    head: {
        padding: 10,
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function createData(name, count, price) {
    return { name, count, price};
}

export default ({location: {state}}) => {
    const classes = useStyles();
    const [data, setData] = React.useState({});

        React.useEffect(() => {
            if(typeof window !== `undefined`) {
                state.products.map(el => {
                    setData(createData(el.product, el.count, el.total))
                })
            }
        }, []);


    return (
    <Grid container style={{marginTop: `75px`}}>
        <Grid item xs={12}>
            <Typography style={{textAlign: `center`}} variant={'h4'}>Ваш заказ успешно оформлен<span role="img" aria-label="accessible-emoji">🎉</span>
                <span role="img" aria-label="accessible-emoji" >🎉</span><span role="img" aria-label="accessible-emoji">🎉</span>
            </Typography>
            <Typography variant={"h6"} style={{textAlign: `center`, padding: 7, fontSize: 13}}>заказ оформлен и принят в обработку</Typography>
        </Grid>
        <Grid item xs={11} sm={10} style={{margin: `50px auto 60px auto`}}>
            <Grid item xs={12}>
                <Typography variant={'h4'}>Детали заказа:</Typography>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{paddingLeft: 10}}>Блюда</StyledTableCell>
                            <StyledTableCell>Количество</StyledTableCell>
                            <StyledTableCell>Цена</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.count}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={12}>
                {typeof window !== `undefined` ? <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h6'}>Общая цена к оплате {state.totalPrice} руб</Typography> : "" }
            </Grid>

            <Grid item xs={12}>
                <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h6'}>Время готовки заказа 30-55 мин</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{textAlign: `right`, paddingRight: 20}} variant={'h5'}>Спасибо что выбираете Свисни Sushi!</Typography>
            </Grid>
            <Grid item xs={12}>
            <Button component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    className={classes.button}>

                Перейти на главную
            </Button>
            </Grid>
        </Grid>
    </Grid>

    )
}



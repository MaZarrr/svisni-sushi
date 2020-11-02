import React from 'react'
import Image from 'gatsby-image'
import useInstagram from '../utils/useInstagram'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { take } from "ramda";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        margin: `10px auto 20px auto`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 300,
        }
    },
    media: {
        maxWidth: 500
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Insta = () => {
    const instaFhotos = useInstagram();
    const { username } = instaFhotos[0];

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState({id: false});

    // const description = photo.caption.split(" \n⠀ \n");
    // const titlePost = description[0];
    // const bodyPost = description[1];
    // const footerPost = description[2];
    // const captionPost = description[3];
    function timeConverter(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let time = date + ' ' + month + ' ' + year;
        return time;
    }

    const handleExpandClick = (id) => {
        setExpanded({[id]: !expanded[id]});
    };

    return (
        <>
            { instaFhotos.map(photo => {
                const description = photo.caption.split(" \n⠀ \n");
                const titlePost = description[0];

                return (
                    <Grid key={photo.id} item xs={12} sm={6}>
                        <Card className={classes.root}>
                            <CardHeader
                                // avatar={
                                //     <Avatar aria-label="recipe" className={classes.avatar}>
                                //         R
                                //     </Avatar>
                                // }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon />
                                //     </IconButton>
                                // }
                                title={`${take(28, titlePost)}`}
                                subheader={timeConverter(photo.timestamp)}
                            />
                            <CardMedia
                                className={classes.media}
                                title="Paella dish"
                            ><Image fluid={photo.fluid} alt={photo.caption} style={{maxWidth: `100%`}}/></CardMedia>

                            <CardContent>
                                <Typography variant="body1"
                                            color="textSecondary">{`${take(160, photo.caption)}...` }</Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                    <Typography variant="caption" color="textSecondary">{photo.likes}</Typography>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ChatBubbleOutlineIcon />
                                    <Typography variant="caption" color="textSecondary">{photo.comments}</Typography>
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded[photo.id],
                                    })}
                                    onClick={() => handleExpandClick(photo.id)}
                                    aria-expanded={expanded[photo.id]}
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded[photo.id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>{photo.caption}</Typography>
                                    <Typography paragraph>
                                        <a href={`https://instagram.com/p/${photo.id}`}
                                           style={{
                                               boxShadow: 0,
                                               display: `block`,
                                               margin: `10px auto`
                                           }}>
                                            <Typography variant="caption" color="textSecondary">Смотреть в Instagram &rarr;</Typography>
                                        </a>
                                    </Typography>
                                    {/*<Typography>*/}
                                    {/*    Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
                                    {/*</Typography>*/}
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                )
            })}</>
    )
};

export default Insta;

//
                // <>
                //     <Grid container>
                // {/*<div style={{display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, margin: `1rem -0.5rem`}}>*/}
                //     {instaFhotos.map(photo =>(
                //         <Grid item xs={6}>
                //         <a href={`https://instagram.com/p/${photo.id}`}
                //         style={{
                //             boxShadow: 0,
                //             display: `block`,
                //             margin: `10px auto`,
                //             maxWidth: `calc(33% - 1 rem)`,
                //             width: 400
                //         }}>
                //             Смотреть больше в Instagram &rarr;
                //             <Image style={{borderRadius: 15}} fluid={photo.fluid} alt={photo.caption}/>
                //         </a>
                //         </Grid>
                //     ))}
                // {/*</div>*/}
                //     </Grid>
                //     {username}
                //
                //         Смотреть больше в Instagram &rarr;
                //     </a>
                // </>
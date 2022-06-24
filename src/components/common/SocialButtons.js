import vk from '../../images/vk-social-logotype.svg'
import ok from '../../images/ok.svg'
import React from 'react'
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({

    socialContent: {
        display: 'flex',
        justifyContent: 'center',
        width: `95%`,
        marginTop: `10px`
    },
    imageStyle: {
        maxWidth: 40, 
        backgroundColor: "#000", 
        borderRadius: 50, 
        border: 'solid 1px lightgrey',
        transform: 'scale(1)',
        transition: '0.1s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
}));

export const SocialButtons = () => { 
    const classes = useStyles()
    
    return (
        <div className={classes.socialContent}>
        {/* <IconButton size="large">
            <a href="https://www.instagram.com/svisni_sushi/" aria-label="instagramm">
                <img 
                className={classes.imageStyle}
                src={insta} alt="Инстаграм"></img>
            </a>
        </IconButton> */}
        <IconButton size="large"> 
            <a href="https://vk.com/sushi_urazovo" aria-label="vkontakte">
                <img 
                className={classes.imageStyle} 
                src={vk} alt="Вконтакте"></img>
            </a>
        </IconButton>
        <IconButton size="large">
            <a href="https://ok.ru/group/55132913991911" aria-label="odnoklassniki">
                <img className={classes.imageStyle} 
                src={ok} alt="Одноклассники"></img>
            </a>
        </IconButton>
    </div>
    );

}
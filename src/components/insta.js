import React from 'react'
import Image from 'gatsby-image'
import useInstagram from '../utils/useInstagram'
import Grid from "@material-ui/core/Grid";

const Insta = () => {
    const instaFhotos = useInstagram();
    const {username} = instaFhotos[0];

    return (
            <>
                <Grid container>
            {/*<div style={{display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, margin: `1rem -0.5rem`}}>*/}
                {instaFhotos.map(photo =>(
                    <Grid item xs={6}>
                    <a href={`https://instagram.com/p/${photo.id}`}
                    style={{
                        boxShadow: 0,
                        display: `block`,
                        margin: `10px auto`,
                        maxWidth: `calc(33% - 1 rem)`,
                        width: 400
                    }}>
                        <Image style={{borderRadius: 15}} fluid={photo.fluid} alt={photo.caption}/>
                    </a>
                    </Grid>
                ))}
            {/*</div>*/}
                </Grid>
                {username}
                <a href={`https://www.instagram.com/svisni_sushi/`}>
                    Смотреть больше в Instagram &rarr;
                </a>
            </>
    )
};

export default Insta;
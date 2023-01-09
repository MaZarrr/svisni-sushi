import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({ 
    container: {
        // width: '100%',
        color: '#00000',
        display: 'flex',
        flexWrap: 'wrap',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(315px, 45%)) !important',
        width: '100%',
        margin: '10px auto',
        justifyContent: 'center'
    },
    imageNews: {
        maxWidth: '500px',
        maxHeight: '500px',
        padding: '10px',
        borderRadius: '20px',
        [theme.breakpoints.down('500')]: {
            width: '100%'
        }     
      },
      newsText: {
        fontSize: '12px',    
        padding: '10px',
        margin: '10px',
      },
      newsContent: {
        minWidth: '20%',
        maxWidth: '45%',
        [theme.breakpoints.down('500')]: {
            maxWidth: '95%'
        },
        justifyContent: 'space-evenly',
        borderRadius: '20px',
        border: '1px solid rebeccapurple',
        margin: '5px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }
}));


const WallNews = (dataItems) => {
    
    const classes = useStyles();

    return (
        <div className={classes.container}>
            { dataItems && dataItems.data.map((news) =>  {
                const photoSizes = news.attachments[0].photo.sizes;
                const type = news.attachments[0].type;

                if(type === 'photo') {
                let photo = photoSizes.find((item) => 
                            item.height < 700 && item.height > 400 &&
                            item.width < 600 && item.width > 500);

                    if(!photo) { photo =  photoSizes.find((item) => 
                        item.height < 900 && item.height > 500 &&
                        item.width < 1000 && item.width > 600); }


                    const dateTimeStamp = new Date(news.date * 1000);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const date = dateTimeStamp.toLocaleDateString('ru-RU', options);
                return (
                    <div key={news.id} className={classes.newsContent}> 
                        <div style={{ display: 'flex', width: '80%' }}>
                        <div style={{ margin: 'auto 0 auto 10px' }}>
                            <AccessTimeIcon />
                        </div>
                        <div style={{
                                fontSize: '13px',
                                color: 'chocolate',
                                fontWeight: 600,
                                padding: '10px',
                                borderBottom: '1px solid lightgray'
                        }}> {date}</div>
                        </div>
                        {/* <hr></hr> */}
                        <div className={classes.newsText} style={{ whiteSpace: 'break-spaces' }} dangerouslySetInnerHTML={{ __html: news.text }} />
                        <img className={classes.imageNews} src={photo.url}  alt={`Новость${news.id}`}/>
                    </div>
                    )
                }
                })
            }
        </div>
    )
};

export default WallNews;
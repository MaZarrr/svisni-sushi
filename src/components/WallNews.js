import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

let Container = styled.div`
  /* color: ${props => props.color}; */
  color: '#00000';
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(315px, 45%)) !important;
  width: 100%;
  margin: 10px auto;
  justify-content: center;
`

const ImageNews = styled.img`
    max-width: 500px;
    max-height: 500px;
    padding: 10px;
    border-radius: 20px;
    @media (max-width: 500px) {
        width: 100%;
  }
`

const NewsText = styled.div`
    font-size: 13px;    
    padding: 10px;
    margin: 10px;
`

const NewsContant = styled.div`
    border-radius: 20px;
    border: 1px solid rebeccapurple;
    margin: 5px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`

const WallNews = (dataItems) => {
    return (
        <Container>
            { dataItems && dataItems.data.map((news) =>  {
                const photoSizes = news.attachments[0].photo.sizes;
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
                    <NewsContant key={news.id}>
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
                        <NewsText style={{ whiteSpace: 'break-spaces' }} dangerouslySetInnerHTML={{ __html: news.text }} />
                        <ImageNews src={photo.url}  alt={`Новость${news.id}`}/>
                    </NewsContant>
                    )
                })
            }
        </Container>
    )
};

export default WallNews;
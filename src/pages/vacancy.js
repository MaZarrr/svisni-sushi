import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import { graphql } from "gatsby"
import Seo from "../components/seo";
import TextField from "@mui/material/TextField";
import HeadSection from "../components/HeadSection"
import { StaticImage } from "gatsby-plugin-image";
import styled from '@emotion/styled'

const SectionInfo = styled.section `
    padding: 10px 0 50px 0;
    .items-container {
        display: flex;
        justify-content: space-around;
        //max-width: 40%;
        @media (max-width: 500px) {
            flex-direction: column;
        }
    }
    .item-content {
        margin: auto 0;
    }
`

const Container = styled.div`
    padding-left: 30px;
    display: flex;
    flex-wrap: wrap;
    h2 {
        padding-top: 20px;
    }
    @media (max-width: 500px) {
        padding-left: 20px;
        flex-direction: column;
    }
    .item-section {
        width: 99%;
        display: flex;
        margin-top: 10px;
        @media (max-width: 500px) {
            width: 99%;
            flex-wrap: wrap;
        }
    }
    .item-section-vacancy {
        display: flex;
        width: 96%;
        flex-direction: column;
        margin-bottom: 30px;
    }
`

const Vacancy = () => {

    return (
        <section>
            <Seo title="Работа, вакансии в Уразово"
                 description="Работа в Свисни Суши. Повар сушист, оператор, пиццмейкер"
                 noindex={true}/>
                <HeadSection titleTXT={"Вакансии Свисни Суши"} />
                <Container>
                    <div className="item-section">
                    <Typography variant="subtitle2" style={{padding: `10px 50px 10px 0`, width: `98%`}}>
                        Бренд Свисни Суши — был основан в 2018 году, когда открылся первый ресторан японской кухни формата «возьми с собой» в
                        Уразово. С 2018 года мы начали активное развитие и сейчас мы хотим, чтобы каждый имел возможность наслаждаться вкусом
                        лучших блюд японской кухни, поэтому планируем освоение новых территорий и открытие суши баров в Валуйках.
                        И нам требуются ответственные и трудолюбивые сотрудники на постоянную работу.
                    </Typography>
                    </div>
                </Container>
        </section>
    );
}

export default Vacancy

// export const query = graphql `
//   {
//     allContentfulInfoModel {
//         edges {
//             node {
//                 childContentfulInfoModelJobSvisniTextNode {
//                     childMarkdownRemark {
//                         id
//                         html
//                         frontmatter {
//                             vacancy
//                             experience
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
// `


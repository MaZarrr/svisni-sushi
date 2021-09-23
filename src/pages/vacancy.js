import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { graphql } from "gatsby"
import Seo from "../components/seo";
import TextField from "@material-ui/core/TextField";
import HeadSection from "../components/HeadSection"
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

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

const Vacancy = ({ data: { allContentfulInfoModel: { edges: allMd } }}) => {
    const [expanded, setExpanded] = React.useState({nameCart: false});
    const [state, setState] = React.useState({status: ""});
    const [infoVacancy, setInfoVacancy] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setInfoVacancy(allMd)
        setTimeout(() => {
            setLoading(false)
        }, 700)
    }, [allMd])

    const submitForm = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                setState({ status: "SUCCESS" });
            } else {
                setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
    const handleExpandClick = (id) => {
        setExpanded({[id]: !expanded[id]});
    };

    return (
        <section>
            <Seo title="Работа, вакансии в Уразово"
                 description="Работа в Свисни Суши. Повар сушист, пиццмейкер"
                 noindex={true}/>
                <HeadSection titleTXT={"Вакансии Свисни Суши"} />
                <Container>
                    <div className="item-section">
                    <Typography style={{padding: `10px 50px 10px 0`, width: `98%`}}>
                        Бренд Свисни Суши — был основан в 2018 году, когда открылся первый ресторан японской кухни формата «возьми с собой» в
                        Уразово. С 2018 года мы начали активное развитие и сейчас мы хотим, чтобы каждый имел возможность наслаждаться вкусом
                        лучших блюд японской кухни, поэтому планируем освоение новых территорий и открытие суши баров в Валуйках.
                        И нам требуются ответственные и трудолюбивые сотрудники на постоянную работу.
                    </Typography>
                        { !loading ?
                            <div className="item-section item-section-vacancy">
                                {infoVacancy.map(({ node: { childContentfulInfoModelJobSvisniTextNode: { childMarkdownRemark } } }) => (
                                  <Card key={childMarkdownRemark.id} raised style={{ margin: `8px 0` }}>
                                      <CardHeader
                                        title={childMarkdownRemark.frontmatter.vacancy}
                                        subheader={childMarkdownRemark.frontmatter.experience} />

                                      <CardActions disableSpacing>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<ExpandMoreIcon />}
                                            id={childMarkdownRemark.id}
                                            style={{ width: `50%` }}
                                            onClick={() => handleExpandClick(childMarkdownRemark.id)}
                                            aria-expanded={expanded["one"]}
                                            aria-label="show more">
                                              Подробнее
                                          </Button>
                                      </CardActions>

                                      <Collapse in={expanded[childMarkdownRemark.id]} timeout="auto" unmountOnExit>
                                          <CardContent>
                                              <Typography variant="body2"
                                                dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }} />

                                              <form onSubmit={submitForm}
                                                    action="https://formspree.io/xbjdqevk"
                                                    method="POST">
                                                  <Typography variant="body1">
                                                      Отклик на вакансию:
                                                  </Typography>
                                                  <TextField
                                                    id="filled-secondary"
                                                    label="Ваше имя"
                                                    required
                                                    fullWidth
                                                    inputProps={{ maxLength: 50, minLength: 3 }}
                                                    variant="filled"
                                                    color="primary"
                                                    name="name" />
                                                  <TextField
                                                    id="filled-secondary"
                                                    label="Телефон"
                                                    required
                                                    fullWidth
                                                    inputProps={{ maxLength: 20, minLength: 10 }}
                                                    variant="filled"
                                                    color="primary"
                                                    name="phone"
                                                    style={{ marginTop: 10 }} />
                                                  {state.status === "SUCCESS" ?
                                                    <h3 style={{ paddingTop: 15 }}>Спасибо! В ближайшее время с вами
                                                        свяжутся.</h3> : <Button
                                                      style={{ margin: `8px 0 8px 0 ` }}
                                                      variant="contained"
                                                      color="primary"
                                                      type="submit">
                                                        Откликнуться
                                                    </Button>}
                                                  {state.status === "ERROR" && <h3>Ooops! Произошла ошибка.</h3>}
                                              </form>
                                          </CardContent>
                                      </Collapse>
                                  </Card>
                                ))}
                                <SectionInfo>
                                <Typography 
                                variant="h2">Плюсы работы в Свисни Суши</Typography>

                                    <div className="items-container">
                                        <div>
                                            <div>
                                                <StaticImage src="../images/money.png"
                                                             alt="Возможность влиять на доход" />
                                            </div>
                                            <div className="item-content">
                                                <p>Возможность влиять на доход</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/icEducation.png" alt="Обучение у наставника" />
                                            <div className="item-content">
                                                <p>Обучение у наставника</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/growth.png"
                                                         alt="Возможность карьерного роста" />
                                            <div className="item-content">
                                                <p>Возможность карьерного роста</p>
                                            </div>
                                        </div>
                                        <div>
                                            <StaticImage src="../images/home.png" alt="Выбор графика работы" />
                                            <div className="item-content">
                                                <p>Выбор графика работы</p>
                                            </div>
                                        </div>

                                    </div>
                                </SectionInfo>
                            </div>
                          : <h6>Загрузка...</h6>}
                    </div>
                </Container>
        </section>
    );
}

export default Vacancy

export const query = graphql `
  {
    allContentfulInfoModel {
        edges {
            node {
                childContentfulInfoModelJobSvisniTextNode {
                    childMarkdownRemark {
                        id
                        html
                        frontmatter {
                            vacancy
                            experience
                        }
                    }
                }
            }
        }
    }
}
`


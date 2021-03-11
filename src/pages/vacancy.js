import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/seo";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import HeadSection from "../components/HeadSection"

const advantages = [
    {
        id: 1,
        img: "../images/money.png",
        text: "Возможность влиять на доход"
    },
    {
        id: 2,
        img: "../images/icEducation.png",
        text: "Обучение у наставника"
    },
    {
        id: 3,
        img: "../images/growth.png",
        text: "Возможность карьерного роста"
    },
    {
        id: 4,
        img: "../images/home.png",
        text: "Выбор графика работы"
    }
]

const Vacancy = () => {

    const [expanded, setExpanded] = React.useState({nameCart: false});
    const [state, setState] = React.useState({status: ""});

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
    const {
        contentfulInfoModel: {childContentfulInfoModelJobSvisniTextNode: {childMarkdownRemark: md}},
        allContentfulInfoModel: {edges: allMd}
    } = useStaticQuery(graphql`
     query {
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
            contentfulInfoModel {
                childContentfulInfoModelJobSvisniTextNode {
                    childMarkdownRemark {
                        frontmatter {
                            infoBrend
                        }
                    }
                }
            }
        }
    `)

    const handleExpandClick = (id) => {
        setExpanded({[id]: !expanded[id]});
    };

    return (
        <section>
            <SEO title="Работа, вакансии"
                 description="Работа в Свисни Суши. Повар сушист, пиццмейкер"
                 noindex={true}/>
             <HeadSection titleTXT={"Вакансии Свисни Суши"} />
            <Grid container>
                <Grid item xs={12} sm={6} style={{paddingLeft: 25}}>
                    <Typography style={{padding: `10px 0 10px 0`, width: `90%`}}>
                        {md.frontmatter.infoBrend}
                    </Typography>
                    <h2 style={{paddingTop: 20}}>Плюсы работы в Свисни Суши</h2>
                    <section style={{padding: `10px 0 10px 0`}}>
                        { advantages.map(({ id, text, img }) => (
                            <div key={id} style={{display: `flex`}}>
                                {/*<StaticImage src={img} alt={text}/>*/}
                                <div style={{margin: `auto 0`, paddingLeft: 10}}>
                                    <p>{text}</p>
                                </div>
                            </div>))}
                    </section>
                </Grid>

                <Grid item xs={12} sm={6} style={{paddingRight: 20, paddingBottom: 30}}>
                    <div style={{marginLeft: 30}}>
                        { allMd.map(({node})=> (
                        <Card key={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.id}>
                            <CardHeader
                                title={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.frontmatter.vacancy}
                                subheader={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.frontmatter.experience}/>

                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<ExpandMoreIcon />}
                                    id={"one"}
                                    style={{width: `50%`}}
                                    onClick={() => handleExpandClick("one")}
                                    aria-expanded={expanded["one"]}
                                    aria-label="show more">
                                    Подробнее
                                </Button>
                            </CardActions>

                            <Collapse in={expanded["one"]} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography dangerouslySetInnerHTML={{__html: node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.html}} />

                            <form onSubmit={submitForm}
                                  action="https://formspree.io/xbjdqevk"
                                  method="POST">
                                <Typography variant="h6">
                                    Отклик на вакансию:
                                </Typography>
                                <TextField
                                    id="filled-secondary"
                                    label="Ф.И.О"
                                    required
                                    fullWidth
                                    inputProps={{maxLength: 50, minLength: 3}}
                                    variant="filled"
                                    color="primary"
                                    name="name"/>
                                <TextField
                                    id="filled-secondary"
                                    label="Телефон"
                                    required
                                    fullWidth
                                    inputProps={{maxLength: 20, minLength: 10}}
                                    variant="filled"
                                    color="primary"
                                    name="phone"
                                    style={{marginTop: 10}}/>
                                {state.status === "SUCCESS" ? <h6 style={{paddingTop: 15}}>В ближайшее время с вами свяжутся.</h6> : <Button
                                    style={{margin: `8px 0 8px 0 `}}
                                    variant="contained"
                                    color="primary"
                                    type="submit">
                                    Откликнуться
                                </Button> }
                                {state.status === "ERROR" && <h6>Ooops! Произошла ошибка.</h6>}
                                </form>
                            </CardContent>
                            </Collapse>
                        </Card>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </section>
    );
}

export default Vacancy


import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Logo from "../images/logoPN.png"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';


import styled from 'styled-components';
import { useStaticQuery, graphql } from "gatsby"
import {useStyleCardIndexPage} from "../components/common/style";
import SEO from "../components/seo";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const AvatarWrapp = styled(Avatar) `
background: ${props => props.color};
`

const Vacancy = () => {

    const classes = useStyleCardIndexPage()
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
        allFile: {edges},
        contentfulInfoModel: {childContentfulInfoModelJobSvisniTextNode: {childMarkdownRemark: md}},
        allContentfulInfoModel: {edges: allMd}
    } = useStaticQuery(graphql`
        {
            allFile(filter: { extension: { eq: "svg" } }) {
                edges {
                    node {
                        publicURL
                    }
                }
            }
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
    const advantages = [
        {
            id: 1,
            imgSrc: edges[0].node.publicURL,
            text: "Возможность влиять на доход"
        },
        {
            id: 2,
            imgSrc: edges[1].node.publicURL,
            text: "Обучение у наставника"
        },
        {
            id: 3,
            imgSrc: edges[2].node.publicURL,
            text: "Возможность карьерного роста"
        },
        {
            id: 4,
            imgSrc: edges[3].node.publicURL,
            text: "Выбор графика работы"
        }
    ]

    const handleExpandClick = (id) => {
        setExpanded({[id]: !expanded[id]});
    };

return (
        <section>
            <SEO title="Работа, вакансии"
                 description="Работа в Свисни Суши. Повар сушист, пиццмейкер"
                 noindex={true}/>
            <div className={classes.titleH1}>
                <h1 style={{fontFamily: `Oswald, cursive`,
                    fontWeight: 600, fontSize: 40}}>Вакансии Свисни Суши в Уразово</h1>
            </div>
            <Grid container>
                <Grid item xs={12} sm={6} style={{paddingLeft: 35}}>
                    <Typography style={{padding: `10px 0 10px 0`, width: `90%`}}>
                        {md.frontmatter.infoBrend}
                    </Typography>

                    <section className=""><h2 style={{paddingTop: 20}}>Плюсы работы в Свисни Суши</h2>
                    </section>
                    <section style={{padding: `10px 0 10px 0`}}>
                        { advantages.map((adva) => (
                            <div key={adva.id} style={{display: `flex`}}>
                                <div>
                                    <img src={adva.imgSrc} alt="Преимущества работы"/>
                                </div>
                                <div style={{margin: `auto 0`, paddingLeft: 10}}>
                                    <p>{adva.text}</p>
                                </div>
                            </div>))}
                    </section>
                </Grid>

                <Grid item xs={12} sm={6} style={{paddingRight: 20, paddingBottom: 30}}>
                    <div style={{marginLeft: 40}}>
                        { allMd.map(({node})=> (
                        <Card key={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.id}>
                            <CardHeader
                                classes={{title: classes.title}}
                                avatar={ <AvatarWrapp alt="Sushi" src={Logo} className={classes.avatar}
                                                 classes={{img: classes.img}}></AvatarWrapp>}
                                title={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.frontmatter.vacancy}
                                subheader={node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.frontmatter.experience}/>

                            <CardActions disableSpacing>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<ExpandMoreIcon />}
                                    id={"one"}
                                    onClick={() => handleExpandClick("one")}
                                    aria-expanded={expanded["one"]}
                                    aria-label="show more">
                                    Подробнее
                                </Button>
                            </CardActions>
                            <Collapse in={expanded["one"]} timeout="auto" unmountOnExit>
                                <CardContent>

                                    <div dangerouslySetInnerHTML={{__html: node.childContentfulInfoModelJobSvisniTextNode.childMarkdownRemark.html}} />

                                    <form className="d-flex flex-column"
                                          onSubmit={submitForm}
                                          action="https://formspree.io/xbjdqevk"
                                          method="POST">
                                        <Typography variant="h6">
                                            Отклик на вакансию:
                                        </Typography>
                                        <TextField
                                            id="filled-secondary"
                                            label="Ф.И.О"
                                            required
                                            inputProps={{maxLength: 50, minLength: 3}}
                                            variant="filled"
                                            color="primary"
                                            name="name"/>
                                        <TextField
                                            id="filled-secondary"
                                            label="Телефон"
                                            required
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


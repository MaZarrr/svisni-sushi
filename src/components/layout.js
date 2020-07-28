import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import {useStyleLayout} from "./common/style";
import loadable from '@loadable/component'
import {connect} from "react-redux";
import {Hidden} from "@material-ui/core";
import {loadIndexItems} from "../reducers/app";
import {graphql, useStaticQuery} from "gatsby";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const Footer = loadable(() => import('./footer'));

const Layout = ({ children, loadIndexItems}) => {

  const classes = useStyleLayout();

  const {allContentfulContentIndex: {edges},
    allContentfulHomePageImageMenu: {edges: menu}} = useStaticQuery(graphql `
    {
      allContentfulContentIndex {
        edges {
          node {
            title
            combos {
              id
              description
              name
              image {
                fluid(maxWidth: 300) {
                  ...GatsbyContentfulFluid
                }
              }
              price
              slug
            }
            new {
              ... on ContentfulProduct {
                id
                name
                price
                slug
                image {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
                }
                count
                description
              }
              ... on ContentfulProductGunkan {
                id
                name
                price
                image {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
                }
                count
                description
              }
              ... on ContentfulProductPizza {
                id
                name
                price
                priceIn33cm
                slug
                image {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
                }
                count
                description
              }
              ... on ContentfulProductSlognyeRolly {
                id
                name
                count
                description
                price
                image {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
                }
                slug
              }
            }
          }
        }
      }
      allContentfulHomePageImageMenu(sort: {fields: desc}) {
        edges {
          node {
            id
            slug
            category
            desc
            image {
              fluid(maxWidth: 300) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);

  React.useEffect(() => {
    loadIndexItems({edges, menu})
  }, [edges, loadIndexItems, menu]);


  React.useEffect(() => {
    loadIndexItems({edges, menu})
  }, [edges, loadIndexItems, menu]);

  return (
      <>
        <Header/>
        <ErrorBoundary>
        <div className={classes.root}>
          <main>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
        </ErrorBoundary>
        <div>
        </div>

        <Hidden xsDown>
          <Footer/>
        </Hidden>
      </>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

const mapDispatchToProps = {
  loadIndexItems
};

export default connect(null, mapDispatchToProps)(Layout)

import React, { useCallback, memo } from "react"
import { Container } from '@material-ui/core'
import CustomizedInputSearch from "./CustomizedInputSearch"
import Categories from "./Categories"
import { setCategory } from "../reducers/filters"
import { connect } from "react-redux"
// import { useStyleH1 } from "../components/common/style"
import { makeStyles } from "@material-ui/core/styles"

const HeadSection = memo(({ isFilter = false, categoryNames, category, path, titleTXT, dispatch }) => {
  const { title, wrapped } = useStyleH1();

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  },[dispatch]);

  return (
    <Container className={wrapped} maxWidth={'xl'}>
      <h1 className={title}>{titleTXT}</h1>
      { isFilter && <>
      <CustomizedInputSearch location={path}/>
      <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/> </>
      }
    </Container>
  )
})

const mapStateToProps = (state) => ({
  category: state.filters.category
});
export default connect(mapStateToProps, null)(HeadSection)

export const useStyleH1 = makeStyles(theme => ({
  title: {
    fontWeight: 900,
    marginBottom: 0,
    textTransform: `uppercase`,
    letterSpacing: `-1.6px`,
    fontSize: 34,
    [theme.breakpoints.down('600')]: {
      paddingTop: 15,
    },
    [theme.breakpoints.down('475')]: {
      fontSize: 26,
      margin: `25px 0 0 0`,
    }
  },
  wrapped: {
    marginTop: 80,
    paddingLeft: 10,
    [theme.breakpoints.down('600')]: {
      marginTop: 0
    },
  }
}));



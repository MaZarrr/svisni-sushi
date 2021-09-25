import React, { useCallback, memo } from "react"
import { Typography } from '@mui/material'
import { setCategory } from "../reducers/filters"
import { connect } from "react-redux"
import makeStyles from '@mui/styles/makeStyles';
import Categories from "./Categories"
import CustomizedInputSearch from "./CustomizedInputSearch"


export const useStyleH1 = makeStyles(theme => ({
  wrapped: {
    marginTop: 70,
    paddingLeft: 15,
    [theme.breakpoints.down('600')]: {
      paddingLeft: 20,
      margin: `40px 0 0 0`,
      paddingTop: '10px',
    },
    [theme.breakpoints.down('475')]: {
      fontSize: 24,
      margin: `5px 0 0 0`,
    }
  }
}));


const HeadSection = memo(({ isFilter = false, categoryNames, category, path, titleTXT, dispatch }) => {
  const { title, wrapped } = useStyleH1();

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  },[dispatch]);

  return (
    <div className={wrapped}>
      <Typography variant="h1"
      sx={{
        marginBottom: 0,
        textTransform: `uppercase`,
        letterSpacing: `-1px`,
        '@media screen and (max-width: 600px) ': {
          margin: `40px 0 0 0`,
        },
        '@media screen and (max-width: 475px) ': {
          margin: `40px 0 0 0`,
        },
      }}
      className={title}>{titleTXT}</Typography>
      { isFilter && <>
        <CustomizedInputSearch location={path}/>
        <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/> </>
  
  }
  </div>
  )
})

const mapStateToProps = (state) => ({
  category: state.filters.category
});
export default connect(mapStateToProps, null)(HeadSection)





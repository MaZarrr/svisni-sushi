import React, { useCallback, memo } from "react"
import { Typography } from '@mui/material'
import { setCategory } from "../reducers/filters"
import { connect } from "react-redux"
import Categories from "./Categories"
import CustomizedInputSearch from "./CustomizedInputSearch"
import styled from "@emotion/styled";

const ContentHead = styled.div `
  margin-bottom: 5px;
  padding: 0 20px;
`

const HeadSection = memo(({ isFilter = false, categoryNames, category, path, titleTXT, dispatch }) => {

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  },[dispatch]);

  return (
      <ContentHead>
          <Typography variant="h1"
                      sx={{
                          marginBottom: 0,
                          textTransform: `uppercase`,
                          letterSpacing: `-1px`
                      }}>{titleTXT}</Typography>
          { isFilter && <>
              <CustomizedInputSearch location={path}/>
              <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/> </>

          }
      </ContentHead>
  )
})

const mapStateToProps = (state) => ({
  category: state.filters.category
});
export default connect(mapStateToProps, null)(HeadSection)





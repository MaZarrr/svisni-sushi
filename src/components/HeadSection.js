import React, { useCallback, memo } from "react"
import { Typography } from '@mui/material'
import { setCategory } from "../reducers/filters"
import { connect } from "react-redux"
import Categories from "./Categories"
import CustomizedInputSearch from "./CustomizedInputSearch"
import styled from "@emotion/styled";

const ContentHead = styled.div `
  margin-bottom: 5px;
  max-width: 1536px;
  margin: 0 auto;
`

const HeadSection = memo(({ isFilter = false, categoryNames, category, path, titleTXT, dispatch }) => {
  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  },[dispatch]);
console.log('path', isFilter);
  return (
      <ContentHead>
        { !isFilter ? (

<Typography variant="h1"
sx={{
  marginBottom: 2,
  textTransform: `uppercase`,
  letterSpacing: `-1px`
}}>{titleTXT}</Typography>
        ) : (

          <Typography variant="h1"
          sx={{
            marginBottom: 0,
            textTransform: `uppercase`,
            letterSpacing: `-1px`
          }}>{titleTXT}</Typography>
        )
        }

        { isFilter && <>
          <CustomizedInputSearch location={path}/>
        { (path === 'sety' || path === 'pizza') && <> 
          <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory}/>  
        </>
        }
      </>

        }
      </ContentHead>
  )
})

const mapStateToProps = (state) => ({
  category: state.filters.category
});
export default connect(mapStateToProps, null)(HeadSection)





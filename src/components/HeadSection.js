import React, { useCallback, memo } from "react"
import { Container } from '@material-ui/core'
import CustomizedInputSearch from "./CustomizedInputSearch"
import Categories from "./Categories"
import { setCategory } from "../reducers/filters"
import { connect } from "react-redux"
import { useStyleH1 } from "../components/common/style"

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


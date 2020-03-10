 export default (product, searchText, priceFilter, checkboxFilter) => {
        
    const search = (items, txt) => {
        if(txt === undefined) {
          return items
        }
        return items.filter(({node}) => {
          
          return node.name.toLowerCase().indexOf(txt.toLowerCase()) > -1
        })
      }

    const filter = (items, filter) => {
      switch (filter) {
        case 'def':
          return items
        case 'inc':
          return items.sort((a, b)=> a.node.price - b.node.price)
        case 'dec':
          return items.sort((a, b)=> b.node.price - a.node.price)

        default:
          return items
      }
    }

    const filterCheckbox = (items, filterCheckbox) => {
        switch (filterCheckbox) {
          case 'def':
            return items
          case 'two': 
            return items.filter(({node}) => node.count < 32)
          case 'three':
            return items.filter(({node}) => node.count > 32 && node.count < 55 )
          case 'fo':
            return items.filter(({node}) => node.count > 55 && node.count < 64 )
          case 'five':
            return items.filter(({node}) => node.count > 63)

          default:
            return items
        }
    }

  
  return filterCheckbox(filter(search(product, searchText), priceFilter), checkboxFilter)
    
  }

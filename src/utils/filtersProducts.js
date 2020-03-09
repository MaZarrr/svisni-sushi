 export default (product, searchText, priceFilter) => {
        
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

  
  return filter(search(product, searchText), priceFilter)
    
  }

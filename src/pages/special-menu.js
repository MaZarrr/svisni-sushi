import React, { useEffect } from "react";
import { Router } from "@reach/router";

import VegetariansMenu from "../components/VegetariansMenu";
import { navigate } from "gatsby";

const BounceToHome = () => {
  useEffect(() => {
    navigate('/', { replace: true })
  }, [])
  return null
}

const SpecialMenu = (props) => {
  console.log(props);
  return (
    <div>
      <Router>
        <VegetariansMenu path="special-menu/vegetarian/" />
        <BounceToHome default />
      </Router>
    </div>

  )
}

export default SpecialMenu;
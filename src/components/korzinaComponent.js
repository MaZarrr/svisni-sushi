import React, {useState, useEffect, useRef} from "react"
import { Link } from 'gatsby';
import * as R from 'ramda'
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import withStyles from '@mui/styles/withStyles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from '@emotion/styled'

const KorzinaItem = styled.div `
  min-width: 90px;
  display: flex;
  justify-content: flex-end;
`;

const TextTotal = styled.span `
  display: flex;
  flex-direction: column;
  ${({count, prevCount}) => count > prevCount ? `animation-duration: 0.5s;
        animation-name: slidein;
        animation-iteration-count: 2;
        animation-direction: reverse;` : ``
}

    @keyframes slidein {
      0% {
        transform: rotate(0deg);
      }
      20% {
        transform: rotate(10deg) scale(1.3);
        color: tomato;
      }
      40% {
        transform: rotate(-10deg) scale(1.1);
        color: tomato;
      }
      60% {
        transform: rotate(10deg) scale(1.3);
        color: tomato;
      }
      80% {
        transform: rotate(-10deg) scale(1.1);
        color: tomato;
      }
      100% {
        transform: rotate(0deg) scale(1.00);
      }
}
`;

const StyledBadge = withStyles((theme) => ({
    badge: {
        padding: 0,
        width: `37px`,
        color: `#000`,
        border: `2px solid lightgrey`,
        backgroundColor: `#fff`,
        opacity: `94%`
        // border: `2px solid ${theme.palette.background.paper}`
    }
}))(Badge);


const Korzina = ({ cartItems = [], orderTotal = 0}) => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count); // изначально 0 и сразу заришет 0
  const totalCount = R.compose(
        R.sum,
        R.pluck('count')
      )(cartItems);

  // usePrevious(count) // передаем в хук начальное значение // count = 0

  function usePrevious(value) { // получаем count = 0 в value
    const ref = useRef(); // аналог useState // Реф — это общий контейнер, а его свойство current — изменяемое и может хранить 
    // любое значение, подобно свойству экземпляра класса.
    useEffect(() => {
      ref.current = value; // записываем в ref.current значение 0 // count = 0
    });
    return ref.current; // возвращаем текущее значение // равное изначально 0
    // при первом нажатии в prevCount вернет 0
  } 

  useEffect(() => {
    setCount(totalCount) // записываем количестов товара в корзине в count // при первом добавлении count = 1
    // в count запишем 1 и при СЛЕДУЮЩЕМ РЕНДЕРИНГЕ ПОЛУЧИМ в prevCount 1 а в count уже будет 2(2й клик)
  }, [totalCount]);

return (
  <KorzinaItem >
      <Link to="/korzina/" state={{ loading: false }}>
          <IconButton aria-label="cart" size="large">
          <TextTotal count={count} prevCount={prevCount} >
              <StyledBadge anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}  badgeContent={totalCount === 0 ? "0" : totalCount}/>

                  <ShoppingCartIcon fontSize={'large'}/>
                  <StyledBadge badgeContent={!orderTotal ? "0" : orderTotal} max={9999} anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                  }} />

          </TextTotal>
          </IconButton>
      </Link>
  </KorzinaItem>
);
};

const mapStateToProps = (state) => ({
    cartItems: state.shoppingCart.cartItems,
    orderTotal: state.shoppingCart.orderTotal
});

export default connect(mapStateToProps, null)(Korzina)

import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';
import * as R from 'ramda'
import { connect } from 'react-redux';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import IconButton from '@material-ui/core/IconButton';

const KorzinaItem = styled.div `
  min-width: 100px;
  /* margin: 0 auto; */
  padding: 0 auto;
&:hover {
  transition: 0.1s ease-in;
  transform: scale(1.09);
} 
.gatsby-image-wrapper {
  margin: 0;
  padding: 0;
}

.korzina_img {
  text-decoration: none;
  margin: 0;
  padding: 0;
}

.korzina_content {
  text-align: center;
  font-size: 14px;
}
`

const TextTotal = styled.span `
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
        transform: rotate(30deg);
        color: tomato;
      }
      40% {
        transform: rotate(-30deg);
        color: tomato;
      }
      60% {
        transform: rotate(30deg);
        color: tomato;
      }
      80% {
        transform: rotate(-30deg);
        color: tomato;
      }
      100% {
        transform: rotate(0deg);
      }
}
`

const Korzina = ({ orderTotal, cartItems }) => {
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
  }, [totalCount])

return (
    <>
    <KorzinaItem >
        <Link className="korzina_img" to="/korzina">
          <div className="korzina_content">

            <IconButton style={{margin: 0, padding: 0, width: `60px`}} color="secondary" size='medium'>
            <TextTotal count={count} prevCount={prevCount} >
              <ShoppingBasketRoundedIcon/>
            </TextTotal>
            </IconButton>

            {/* <div className="korzina_content korzina_content_txt"> */}
              {/* <b><TextTotal styledAdded={totalCount} className="txt_total">{totalCount} ({orderTotal} ₽)</TextTotal></b> */}
              {/* <b><span className="txt_total">{totalCount} ({orderTotal} ₽)</span></b>
            </div> */}

          </div>
        </Link>
    </KorzinaItem>
    </>
        )
}

const mapStateToProps = ({ shoppingCart: {cartItems, orderTotal} }) => {
    return {cartItems, orderTotal};
  }

export default connect(mapStateToProps)(Korzina)

import React, {useEffect} from "react"
import VK, {Comments} from "react-vk";
import SEO from "../components/seo"
import styled  from 'styled-components';

const Otzyv = styled.section `
    .container {
        margin: 8vmax 0 0 3vw;
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        .container {
        margin: 0 0 0 3vw;
        padding: 0;
    }
      .container h1 {
        font-size: 7vw;
    }
    }
` 

const Otzyvy = () => {

// useEffect(() => {
//    window.VK.init({
//         apiId: 7141171,
//         onlyWidgets: true
//     });
// }, [])

// useEffect(() => {
//   window.VK.Widgets.Comments('vk_comments');
// }, [])

return (
  <>
    <SEO title="Отзывы" />
    <section>
      <VK apiId={7311665}>
        <Comments elementId="vk_comments" />
        <Otzyv></Otzyv>
      </VK>
      <iframe
        id="vk_comments"
        className="vk_comments"
        style={{ width: `100%`, height: `400px` }}
      >
        {/* <h1>Отзывы</h1> */}
      </iframe>
    </section>
  </>
)
}

export default Otzyvy
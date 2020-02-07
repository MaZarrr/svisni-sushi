import React from "react"
import VK, {Comments} from "react-vk";
import SEO from "../components/seo"
// import styled  from 'styled-components';

// const Otzyv = styled.section `
//     .container {
//         margin: 8vmax 0 0 3vw;
//         padding: 0;
//     }

//     @media screen and (max-width: 768px) {
//         .container {
//         margin: 0 0 0 3vw;
//         padding: 0;
//     }
//       .container h1 {
//         font-size: 7vw;
//     }
//     }
// ` 

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

// const test = () => {

// }

return (
  <>
    <SEO title="Отзывы" />
    <section>
      <VK apiId={7311665} onlyWidgets="true">
        <Comments elementId="vk_comments" />
      </VK>
      <div
        id="vk_comments"
        className="vk_comments"
        style={{ width: `85%`, height: `400px` }}
      >
       {/* < Otzyv > < /Otzyv> */}
        {/* <h1>Отзывы</h1> */}
      </div>
    </section>
  </>
)
}

export default Otzyvy
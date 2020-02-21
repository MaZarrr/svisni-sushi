import React from "react"
import VK, {Comments} from "react-vk";
import SEO from "../components/seo"

const Otzyvy = () => {

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
      </div>
    </section>
  </>
)
}

export default Otzyvy
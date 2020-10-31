import {graphql, useStaticQuery} from 'gatsby'

const useInstagram = () => {
    const data = useStaticQuery(graphql`
    query{
    allInstaNode(limit: 4) {
    nodes {
      id
      caption
      username
      localFile{
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400){
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
}
`);

    return data.allInstaNode.nodes.map(node => ({
        ...node.localFile.childImageSharp,
        id: node.id,
        caption: node.caption,
        username: node.username
    }))
};

export default useInstagram
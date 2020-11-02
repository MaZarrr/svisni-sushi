import {graphql, useStaticQuery} from 'gatsby'

const useInstagram = () => {
    const data = useStaticQuery(graphql`
            query {
            allInstaNode(limit: 4,
                sort: {order: DESC, fields: timestamp},
                filter: {caption: {regex: "/\\\\#рекомендуемsvisniсуши/"}}) {
                edges {
                    node {
                        id
                        caption
                        likes
                        timestamp
                        comments
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
        }
    `);

    return data.allInstaNode.edges.map(element => ({
        ...element.node.localFile.childImageSharp,
        id: element.node.id,
        caption: element.node.caption,
        comments: element.node.comments,
        likes: element.node.likes,
        timestamp: element.node.timestamp
    }))
};

export default useInstagram
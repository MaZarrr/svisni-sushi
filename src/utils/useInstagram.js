import {graphql, useStaticQuery} from 'gatsby'

const instaQuery = graphql`
    query {
        allInstaNode(limit: 4,
            sort: {order: DESC, fields: timestamp},
            filter: {caption: {regex: "/\\\\#рекомендуемsvisniсуши/"}}) {
            nodes {
                id
                caption
                comments
                likes
                timestamp
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
`

const useInstagram = () => {
    const data = useStaticQuery(instaQuery);

    return data.allInstaNode.nodes.map(node => ({
        ...node.localFile.childImageSharp,
        id: node.id,
        caption: node.caption,
        comments: node.comments,
        likes: node.likes,
        timestamp: node.timestamp
    }))
};

export default useInstagram
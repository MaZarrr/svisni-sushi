import {graphql, useStaticQuery} from 'gatsby'

const useInstagram = () => {
    const data = useStaticQuery(graphql`
            {
            allInstaNode(limit: 4,
                sort: {order: DESC, fields: timestamp},
                filter: {caption: {regex: "/\\\\#рекомендуемsvisniсуши/"}}) {
                nodes {
                    id
                    caption
                    username
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
    `);

    return data.allInstaNode.nodes.map(node => ({
        ...node.localFile.childImageSharp,
        id: node.id,
        caption: node.caption,
        username: node.username,
        comments: node.comments,
        likes: node.likes,
        timestamp: node.timestamp
    }))
};

export default useInstagram
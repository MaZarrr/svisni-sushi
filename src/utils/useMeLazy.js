import { useLazyQuery } from "@apollo/client"
import gql from "graphql-tag"

const ME_QUERY = gql`
    query meQuery {
        me {
            id
            phone
            role
            verified
        }
    }
`

export const useMeLazy = () => {
    return useLazyQuery(ME_QUERY)
}
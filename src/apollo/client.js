import fetch  from "isomorphic-fetch";
import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client'
import { isBrowser, TOKENSTORAGE } from "../components/common/constants";

const token = isBrowser ? localStorage.getItem(TOKENSTORAGE) : null
export const isLoggedInVar = makeVar(Boolean(token))
export const authTokenVar = makeVar(token)

console.log("isLoggedInVar ======", isLoggedInVar());
console.log("authTokenVar  ========", authTokenVar());

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:3000/graphql",
        fetch
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar()
                        },
                    },
                    token: {
                        read() {
                            return authTokenVar()
                        }
                    }
                }
            }
        }
    })
})
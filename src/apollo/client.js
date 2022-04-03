import fetch  from "isomorphic-fetch";
import { ApolloClient, createHttpLink, HttpLink, InMemoryCache, makeVar } from '@apollo/client'
import { isBrowser, TOKENSTORAGE } from "../components/common/constants";
import { setContext } from '@apollo/client/link/context'

const token = isBrowser ? localStorage.getItem(TOKENSTORAGE) : null
export const isLoggedInVar = makeVar(Boolean(token))
export const authTokenVar = makeVar(token)

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
    fetch
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || ""
        }
    }
});

console.log("isLoggedInVar ======", isLoggedInVar());
console.log("authTokenVar  ========", authTokenVar());

export const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
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

// window.__APOLLO_CLIENT__ = client;
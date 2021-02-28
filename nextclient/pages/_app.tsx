import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"
import "../styles/index.css"
import React, { createContext, useCallback, useEffect, useReducer } from "react"
import Layout from "antd/lib/layout/layout"
import AppFooter from "../components/layouts/AppFooter"
import AppHeader from "../components/layouts/AppHeader"
import axios from "axios"
import { initial, reducer } from "../reducer"

const AppLayouts = styled(Layout)`
    width: 100%;
    background-color: #ffffff;
`

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

export const AppContext = createContext(initial)

function MyApp({ Component, pageProps, user }: AppProps) {
    const [state, dispatch] = useReducer(reducer, initial)

    const handleLogout = () => {
        dispatch({
            type: "AUTH",
            payload: { username: "", token: "", id: "", admin: false },
        })
    }

    const handleShowSider = useCallback(() => {
        dispatch({ type: "SHOWING" })
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch({
                type: "AUTH",
                payload: { ...user },
            })
            return
        }

        if (user.id) {
            localStorage.setItem("token", JSON.stringify(user.id))
            dispatch({
                type: "AUTH",
                payload: { ...user },
            })
        }
    }, [user])

    return (
        <AppContext.Provider value={state}>
            <AppLayouts>
                <AppHeader
                    handleLogout={handleLogout}
                    handleShowSider={handleShowSider}
                    showSider={state.showSider}
                />
                <Component {...pageProps} />
                <AppFooter>KimChanghoe &copy; 2021</AppFooter>
            </AppLayouts>
        </AppContext.Provider>
    )
}

export default MyApp

MyApp.getInitialProps = async (app: any) => {
    const request = app.ctx?.req

    let cookie = ""
    if (request) {
        cookie = request.headers.cookie || ""
    }

    const user = await axios
        .get("/auth", {
            headers: {
                cookie: cookie,
            },
        })
        .then((res) => res.data)

    return { user }
}

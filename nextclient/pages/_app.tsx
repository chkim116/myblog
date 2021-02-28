import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"
import "../styles/index.css"
import React, { createContext, useCallback, useEffect, useReducer } from "react"
import Layout from "antd/lib/layout/layout"
import AppFooter from "../components/layouts/AppFooter"
import AppHeader from "../components/layouts/AppHeader"
import axios from "axios"

const AppLayouts = styled(Layout)`
    width: 100%;
    background-color: #ffffff;
`

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

const initial = {
    showSider: false,
    user: {
        username: "",
        token: "",
        id: "",
        admin: false,
    },
}

export const AppContext = createContext(initial)

const showing = {
    showSider: false,
}

function reducer(state: { showSider: boolean }, action: any) {
    switch (action.type) {
        case "SHOWING": {
            return { ...state, showSider: !state.showSider }
        }

        default:
            return state
    }
}

function MyApp({ Component, pageProps, user }: AppProps) {
    const [state, dispatch] = useReducer(reducer, showing)

    const handleShowSider = useCallback(() => {
        dispatch({ type: "SHOWING" })
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            return
        } else {
            localStorage.setItem("token", JSON.stringify(user.id))
        }
    }, [user])

    return (
        <AppContext.Provider value={{ showSider: state.showSider, user }}>
            <AppLayouts>
                <AppHeader
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
        cookie = request.headers?.cookie
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

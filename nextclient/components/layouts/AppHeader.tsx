import React, {
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react"
import styled from "@emotion/styled"
import { Header } from "antd/lib/layout/layout"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { AppContext } from "../../pages/_app"

const App = styled(Header)<{ scaleheight: string }>`
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    height: ${({ scaleheight }) => (scaleheight === "true" ? "75px" : "65px")};
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    z-index: 300;
    justify-content: space-between;

    transition: all 200ms;

    .header__container {
        max-width: 1000px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        span {
            cursor: pointer;
        }
    }

    .header__login {
        margin-right: 15px;
    }
`
interface Props {
    handleLogout: () => void
    handleShowSider: () => void
    showSider?: boolean
}

const logoutFetcher = async (url: string) => {
    return await axios.post(url)
}

const AppHeader = ({ handleLogout, handleShowSider, showSider }: Props) => {
    const [scaleHeight, setScaleHeight] = useState(false)
    const router = useRouter()
    const [isToken, setIsToken] = useState(false)

    const handleLogOut = useCallback(() => {
        logoutFetcher("/auth/logout")
        handleLogout()
        localStorage.removeItem("token")
        setIsToken(false)
    }, [])

    //  유저확인
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsToken(true)
        } else {
            setIsToken(false)
        }
    }, [router])

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 75) {
                setScaleHeight(() => true)
            } else {
                setScaleHeight(() => false)
            }
        })

        return () => {
            document.removeEventListener("scoll", (_) => _)
        }
    }, [])

    return (
        <App scaleheight={scaleHeight.toString()}>
            <div className="header__container">
                <Link href="/">
                    <div>
                        <span>개발자의 생각창고</span>
                    </div>
                </Link>
                <div className="header__login">
                    {isToken ? (
                        <>
                            <Link href="/upload">
                                <Button type="link" size="large">
                                    Upload
                                </Button>
                            </Link>
                            <Button
                                type="link"
                                size="large"
                                onClick={handleLogOut}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button type="link" size="large">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
                {router.pathname !== "/" && router.route !== "/[categories]" && (
                    <Button
                        type="ghost"
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "10px",
                        }}
                        size="large"
                        onClick={handleShowSider}
                    >
                        {showSider ? <CloseOutlined /> : <MenuOutlined />}
                    </Button>
                )}
            </div>
        </App>
    )
}

export default AppHeader

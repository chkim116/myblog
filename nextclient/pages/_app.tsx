import { AppProps } from "next/dist/next-server/lib/router/router"
import styled from "@emotion/styled"

const AppLayout = styled.main`
    width: 100%;
`

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    )
}

export default MyApp

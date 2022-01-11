import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/layout'
import { SSRProvider } from 'react-bootstrap'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />
  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="你好，我是VUP海离" />
        <link rel="icon" href="/img/square_logo.png" />
      </Head>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </>
  )
}

export default MyApp

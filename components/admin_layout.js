import Head from 'next/head'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { SSRProvider } from 'react-bootstrap'
import { SWRConfig } from 'swr'
import Footer from './footer'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import Logo from '../public/img/miriko_v2_web.png'
import NavStyles from './styles/navbar.module.css'


export default function AdminLayout({ children }) {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  return(
    <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}
        >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="你好，我是VUP海离" />
        <link rel="icon" href="/img/square_logo.png" />
      </Head>
      <SSRProvider>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="/">
              <Image className={NavStyles.iconImage + ' nav-icon'} src={Logo} alt="海离Channel LOGO" placeholder="blur" quality={100}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link href="/user/" passHref><Nav.Link>主页</Nav.Link></Link>
                <Link href="/user/profile" passHref><Nav.Link>个人资料</Nav.Link></Link>
                <Link href="/user/logout" passHref>
                  <Nav.Link onClick={async (e) => {
                    e.preventDefault();
                    mutateUser(
                      await fetchJson("/api/user/logout", { method: "POST" }),
                      false,
                    );
                    router.push("/user/login");
                }}>退出</Nav.Link></Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main>{children}</main>
        <Footer />
      </SSRProvider>
    </SWRConfig>
    
  )
}
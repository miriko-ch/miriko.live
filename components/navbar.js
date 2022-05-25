import Image from "next/image"
import Link from "next/link"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import Logo from '../public/img/miriko_v2_web.png'

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <div style={{ position: 'relative', width: '120px', height: '30px' }}>
            <Image className="nav-icon" src={Logo} layout="fill" objectFit="contain" alt="海离Channel LOGO" placeholder="blur" quality={100}/>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref><Nav.Link>主页</Nav.Link></Link>
            <Link href="/box" passHref><Nav.Link>提问箱</Nav.Link></Link>
            <Link href="https://eat.miriko.live" passHref><Nav.Link target="_blank">吃掉海离小游戏</Nav.Link></Link>
            <NavDropdown title="更多" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://github.com/miriko-channel" target="_blank">GitHub</NavDropdown.Item>
              <NavDropdown.Item href="https://url.miriko.live" target="_blank">短链生成</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user">用户后台</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
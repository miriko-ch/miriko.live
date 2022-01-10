import Image from "next/image"
import Link from "next/link"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import Logo from '../public/img/live_logo.png'

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <div className="center-container">
            <Image src={Logo} alt="海离Channel" width={120} height={43} />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref><Nav.Link>主页</Nav.Link></Link>
            <Link href="/box" passHref><Nav.Link>提问箱</Nav.Link></Link>
            <NavDropdown title="更多" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://github.com/miriko-channel" target="_blank">GitHub</NavDropdown.Item>
              <NavDropdown.Item href="https://url.miriko.live" target="_blank">短链生成</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#admin">后台</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
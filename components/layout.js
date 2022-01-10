import NavBar from '../components/navbar'
import Footer from './footer'
export default function Layout({ children }) {
  return(
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
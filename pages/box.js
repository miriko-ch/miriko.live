import Head from "next/head"
import { Container } from "react-bootstrap"

export default function Box() {
  return(
    <>
      <Head>
        <title>海离的提问箱</title>
      </Head>
      <Container className="py-5 text-center" as="header">
        提问箱desu
      </Container>
    </>
  )
}
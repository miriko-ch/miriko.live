import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBilibili, faTwitter } from '@fortawesome/free-brands-svg-icons'

import AvatarImage from '../public/img/wink.png'
import SquareLogo from '../public/img/square_logo.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>海离Miriko</title>
        <meta name="description" content="你好，我是VUP海离" />
        <link rel="icon" href="/img/square_logo.png" />
      </Head>

      <Container className="py-5 text-center" as="header">
        <Row className="py-lg-5">
          <Col lg={6} md={8} className="mx-auto">
            
            <Image src={AvatarImage} width={120} height={120} layout="fixed" 
                   className={styles.avatar}/>
            <h1 className="pt-2">海离Channel</h1>
            <div className="lead text-muted" id="p-sign">
              <div className="center-container">
                你好！我是个人势VUP
                <Image src={SquareLogo} width={18} height={18} />
              </div>
            </div>
            <div className='py-3'>
              <img className={styles.statBadge + " mx-1"} src="https://bilistats.lonelyion.com/live_status?uid=7564991&label=状态" alt="Live Status"/>
              <img className={styles.statBadge + " mx-1"} src="https://bilistats.lonelyion.com/followers?uid=7564991&label=粉丝数" alt="Followers"/>
            </div>
            <>
              <a href="https://space.bilibili.com/7564991" target="_blank"
                 className="btn btn-outline-info my-2">
                <FontAwesomeIcon icon={faBilibili} />
                {' '}主页
              </a>{' '}
              <a href="https://live.bilibili.com/449047" target="_blank"
                 className="btn btn-outline-warning my-2">
                <FontAwesomeIcon icon={faBilibili} />
                {' '}直播间
              </a>{' '}
              <a href="https://twitter.com/miriko_ch" target="_blank"
                 className="btn btn-outline-primary my-2">
                <FontAwesomeIcon icon={faTwitter} />
                {' '}Twitter
              </a>{' '}
            </>
          </Col>
        </Row>
      </Container>
    </>
  )
}

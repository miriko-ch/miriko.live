import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/home.module.css'

import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBilibili, faTwitter } from '@fortawesome/free-brands-svg-icons'

import AvatarImage from '../public/img/avatar.jpg'
import SquareLogo from '../public/img/square_logo.png'
import FullUniform from '../public/img/character/school_uniform.png'
import FullTechwear from '../public/img/character/techwear.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>海离Miriko</title>
      </Head>
      <Container className="py-5 text-center" as="header">
        <section id="head">
          <Row className="py-lg-5">
            <Col lg={6} md={8} className="mx-auto">
              
              <Image src={AvatarImage} width={120} height={120} layout="fixed" 
                    className={styles.avatar} alt="Avatar"/>
              <h1 className="pt-2">海离Channel</h1>
              <div className="lead text-muted" id="p-sign">
                <div className="center-container">
                  你好！我是个人势VUP
                  <Image src={SquareLogo} width={18} height={18} alt="Site Logo"/>
                </div>
              </div>
              <div className='py-3'>
                <img className={styles.statBadge + " mx-1"} src="https://bilistats.lonelyion.com/live_status?uid=7564991&label=状态" alt="Live Status"/>
                <img className={styles.statBadge + " mx-1"} src="https://bilistats.lonelyion.com/followers?uid=7564991&label=粉丝数" alt="Followers"/>
              </div>
              <>
                <a href="https://space.bilibili.com/7564991" target="_blank" rel="noreferrer"
                  className="btn btn-outline-info my-2">
                  <FontAwesomeIcon icon={faBilibili} />
                  {' '}主页
                </a>{' '}
                <a href="https://live.bilibili.com/449047" target="_blank" rel="noreferrer"
                  className="btn btn-outline-warning my-2">
                  <FontAwesomeIcon icon={faBilibili} />
                  {' '}直播间
                </a>{' '}
                <a href="https://twitter.com/miriko_ch" target="_blank" rel="noreferrer"
                  className="btn btn-outline-primary my-2">
                  <FontAwesomeIcon icon={faTwitter} />
                  {' '}Twitter
                </a>
              </>
            </Col>
          </Row>
        </section>
        <section id="about" className="py-4">
          <h2>简介</h2>
          <small className="text-muted">Introduction</small>
          <Row className="py-2">
            <Col lg={6} className={styles.aboutContent + " mx-auto"}>
              <p>你好，这里是VUP海离，感谢关注！是隐藏于人类中的虚拟JK，也是执行者，不过正在沉迷游戏和看其他VUP（逃）。</p>
              <p>现在有两套衣服，一套是JK制服，一套是执行任务的机能风制服哦。背后背的<strong>不是空调</strong>！</p>
              <p>直播会偶尔打打游戏，并不擅长FPS所以会玩玩别的比如WoWs、WT、明日方舟等，也有可能直播编程/学习/摸鱼，同样由于目前生活环境不稳定直播频率也未知，能播就播。</p>
              <p>视频的话想做知识区科技区的VUP，不过一切都在起步阶段更新频率未知，有空就会更新（可恶，就是没空）。</p>
              <ul className="">
                <li><span>生日</span>21 May</li>
                <li><span>坐标</span>Virtual Neptune</li>
                <li><span>擅长语言</span>C/C++(?)</li>
                <li><span>喜欢的食物</span>辣椒 火锅</li>
                <li><span>喜好</span>吃饭睡觉打游戏看视频收钱花钱最后才是编程</li>
                <li><span>发色</span>白色</li>
                <li><span>瞳色</span>绿色</li>
              </ul>
            </Col>
            <Col xl={4} lg={5} className="">
              <Carousel variant="dark" className={styles.bodies} indicators={false}>
                <Carousel.Item>
                  <img className={styles.characterImage} src="/img/character/school_uniform.png" alt="初始JK制服立绘"/>
                  <div className={styles.frame} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className={styles.characterImage} src="/img/character/techwear.png" alt="初始JK制服立绘"/>
                  <div className={styles.frame} />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  )
}

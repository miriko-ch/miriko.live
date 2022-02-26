import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";

import styles from '../styles/home.module.css'

import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { Parallax } from 'react-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBilibili } from '@fortawesome/free-brands-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'

import AvatarImage from '../public/img/avatar.jpg'
import SquareLogo from '../public/img/square_logo.png'
import CharacterUniform from '../public/img/character/school_uniform.png'
import CharacterTechwear from '../public/img/character/techwear.png'

export default function Home() {
  const [accInfo, setAccInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('/api/info')
      .then(res => res.json())
      .then(json => {
        setAccInfo(json);
        setLoading(false);
      })
  }, []);
  
  return (
    <>
      <Head>
        <title>海离Miriko</title>
      </Head>
      <Container className="py-5 text-center" as="header">
        <section id="head">
          <Parallax bgImage='/img/character/techwear_q.png' blur={10} strength={-300} contentClassName={styles.parallaxContent}>
            <Row className={"py-5 g-0" + styles.headContainer}>
              <Col lg={6} md={8} className="mx-auto">
                <Image src={AvatarImage} width={120} height={120} layout="fixed"
                  className={styles.avatar} alt="Avatar" placeholder="blur" quality={90} />
                <h1 className="pt-2">海离Channel</h1>
                <div className="lead text-muted" id="p-sign">
                  <div className="center-container">
                    你好！我是个人势VUP
                    <Image src={SquareLogo} width={18} height={18} alt="Site Logo" />
                  </div>
                </div>
                <div className="pt-3">
                  <a href="https://space.bilibili.com/7564991" target="_blank" rel="noreferrer"
                    className="btn btn-outline-primary my-2">
                    <FontAwesomeIcon icon={faBilibili} />
                    {' '}Bilibili主页
                  </a>{' '}
                  <a href="https://www.acfun.cn/u/61330786" target="_blank" rel="noreferrer"
                    className="btn btn-outline-danger my-2">
                      <svg style={{ height: '1em', verticalAlign: '-.125em' }} version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                        <g>
                        <path fill="#F54A58" d="M477.7,40.4L10,811.5l233.8,148l48.5-166.1l371-28l96.3,183.8L990,811.5L477.7,40.4z M382.2,616.8l88.5-195.1l99.7,195.1H382.2z"/>
                        </g>
                      </svg>
                    {' '}AcFun主页
                  </a>{' '}
                  <a target="_blank" rel="noreferrer"
                    className={ "btn my-2 " + ( accInfo && (accInfo.bili.live || accInfo.acfun.live) ? "btn-outline-success" : "btn-outline-secondary") }
                    href={ accInfo && accInfo.acfun.live ? 'https://live.acfun.cn/live/61330786' : 'https://live.bilibili.com/449047' }>
                    <FontAwesomeIcon icon={faCirclePlay} />
                    {' '}{ accInfo && (accInfo.bili.live || accInfo.acfun.live) ? '观看直播' : '当前未开播'}
                  </a>
                </div>
                <div className='py-1'>
                  {
                    isLoading
                    ? <small className="text-muted">计算中...</small>
                    : !accInfo
                      ? <small className="text-muted">没有数据</small>
                      : <div>
                          <small className="text-muted">海离子现在共有{' '}
                          <span title="Bilibili">{accInfo.bili.followers}</span>{' + '}<span title="AcFun">{accInfo.acfun.followers}</span>
                          {' '}只</small>
                        </div>
                  }
                  </div>
              </Col>
            </Row>
          </Parallax>
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
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image className={styles.characterImage} src={CharacterUniform} alt="初始JK制服立绘" placeholder="blur" quality={100} />
                  </div>
                  {/* <img className={styles.characterImage} src="/img/character/school_uniform.png" alt="初始JK制服立绘"/> */}
                  <div className={styles.frame} />
                </Carousel.Item>
                <Carousel.Item>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image className={styles.characterImage} src={CharacterTechwear} alt="机能风制服立绘" placeholder="blur" quality={100} />
                  </div>
                  {/* <img className={styles.characterImage} src="/img/character/techwear.png" alt="机能风制服立绘"/> */}
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
